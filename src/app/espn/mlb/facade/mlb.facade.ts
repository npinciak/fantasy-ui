import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { EventMap, ScheduleMap } from '../state/mlb-state.model';
import { FetchBaseballLeague } from '../actions/mlb.actions';
import { MlbState } from '../state/mlb.state';
import { MlbLeagueSelectors } from '../selectors/mlb-league.selectors';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class MlbFacade {
  @Select(MlbLeagueSelectors.selectStandings) public standings$: Observable<Team[]>;

  @Select(MlbState.schedule) public schedule$: Observable<ScheduleMap>;
  @Select(MlbLeagueSelectors.selectStandings) public liveScore$: Observable<Team[]>;

  @Select(MlbState.isLoading) public isLoading$: Observable<boolean>;

  @SelectSnapshot(MlbState.scoringPeriod) public scoringPeriod: number;
  @SelectSnapshot(MlbState.events) public eventSnapshot: EventMap;

  @Dispatch() getLeague = (leagueId: number) => new FetchBaseballLeague(leagueId);
}
