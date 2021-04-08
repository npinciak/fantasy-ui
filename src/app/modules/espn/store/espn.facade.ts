import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BaseballTeam } from '../models/mlb/class/team.class';
import { ScheduleEntry } from '../models/mlb/interface/league';

import { EspnGetBaseballLeague, EspnGetTeamById } from './espn.actions';
import { EspnState } from './espn.state';

@Injectable({ providedIn: 'root' })
export class EspnFacade {

    @Select(EspnState.teams) public teams$: Observable<BaseballTeam[]>;
    @Select(EspnState.schedule) public schedule$: Observable<ScheduleEntry[]>;

    @Select(EspnState.teamsEmpty) public teamsEmpty$: Observable<boolean>;
    @Select(EspnState.isLoading) public isLoading$: Observable<boolean>;

    @SelectSnapshot(EspnState.teams) public teamsSnapshot: BaseballTeam[];

    @Dispatch() getLeague = (leagueId: number) => new EspnGetBaseballLeague(leagueId);
    @Dispatch() getTeamById = (teamId: number) => new EspnGetTeamById(teamId);

}
