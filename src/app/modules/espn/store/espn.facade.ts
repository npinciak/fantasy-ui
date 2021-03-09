import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { FantasyTeam } from '../models';
import { MLBFantasyTeam } from '../models/fantasy-team.class';
import { EspnGetLeague } from './espn.actions';
import { EspnState, Sports } from './espn.state';

@Injectable({ providedIn: 'root' })
export class EspnFacade {

    @Select(EspnState.teams) public teams$: Observable<FantasyTeam[]>;
    @SelectSnapshot(EspnState.teams) public teamsSnapshot: MLBFantasyTeam[];

    @Dispatch() getLeague = (leagueId: number, sport: Sports) => new EspnGetLeague(leagueId, sport);

}
