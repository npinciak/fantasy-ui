import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BaseballTeam } from '../../models/mlb/class/team.class';
import { Team } from '../../models/mlb/interface';
import { FetchBaseballLeague } from './mlb.actions';
import { MlbState } from './mlb.state';

@Injectable({
    providedIn: 'root'
})

export class MlbFacade {
    @Select(MlbState.teams) public teams$: Observable<BaseballTeam[]>;
    @Select(MlbState.teamsEmpty) public teamsEmpty$: Observable<boolean>;
    @Select(MlbState.scoreboard) public scoreboard$: Observable<BaseballTeam[]>;
    @Select(MlbState.isLoading) public isLoading$: Observable<boolean>;

    @SelectSnapshot(MlbState.scoringPeriod) public scoringPeriod: number;
    @SelectSnapshot(MlbState.teams) public teamsSnapshot: Map<number, BaseballTeam>;
    @SelectSnapshot(MlbState.teamsEmpty) public teamsEmpty: boolean;

    @Dispatch() getLeague = (leagueId: number) => new FetchBaseballLeague(leagueId);
}
