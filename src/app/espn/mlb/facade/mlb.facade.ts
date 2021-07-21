import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Game } from '../class/game.class';
import { BaseballTeam } from '../class/team.class';

import { EventMap, GameMap, ScheduleMap, TeamMap } from '../state/mlb-state.model';
import { FetchBaseballLeague } from '../actions/mlb.actions';
import { MlbState } from '../state/mlb.state';
import { EspnEvent } from '../interface';
import { MlbSelectors } from '../selectors/mlb.selectors';
import { MlbTeamSelectors } from '../selectors/mlb-team.selectors';

@Injectable({
  providedIn: 'root',
})
export class MlbFacade {
  @Select(MlbSelectors.standings) public standings$: Observable<BaseballTeam[]>;
  @Select(MlbState.schedule) public schedule$: Observable<ScheduleMap>;
  @Select(MlbSelectors.liveScore) public liveScore$: Observable<BaseballTeam[]>;

  @Select(MlbState.isLoading) public isLoading$: Observable<boolean>;

  @SelectSnapshot(MlbState.scoringPeriod) public scoringPeriod: number;
  @SelectSnapshot(MlbState.events) public eventSnapshot: EventMap;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Dispatch() getLeague = (leagueId: number) => new FetchBaseballLeague(leagueId);
}
