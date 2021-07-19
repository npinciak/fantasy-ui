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

@Injectable({
  providedIn: 'root',
})
export class MlbFacade {
  @Select(MlbState.teams) public teams$: Observable<TeamMap>;
  @Select(MlbState.events) public events$: Observable<EventMap>;
  @Select(MlbState.standings) public standings$: Observable<BaseballTeam[]>;
  @Select(MlbState.schedule) public schedule$: Observable<ScheduleMap>;
  @Select(MlbState.liveScore) public liveScore$: Observable<BaseballTeam[]>;
  @Select(MlbState.eventToGame) public gamesMap$: Observable<GameMap>;
  @Select(MlbState.sortedGamesByStartTime) public sortedGamesByStartTime$: Observable<Game[]>;
  @Select(MlbState.noEvents) public noEvents$: Observable<boolean>;
  @Select(MlbState.teamsEmpty) public teamsEmpty$: Observable<boolean>;
  @Select(MlbState.isLoading) public isLoading$: Observable<boolean>;

  @SelectSnapshot(MlbState.scoringPeriod) public scoringPeriod: number;
  @SelectSnapshot(MlbState.teams) public teamsSnapshot: TeamMap;
  @SelectSnapshot(MlbState.teamsEmpty) public teamsEmpty: boolean;
  @SelectSnapshot(MlbState.events) public eventSnapshot: EventMap;

  constructor(private store: Store) {}

  selectEventById = (id: number) => this.store.selectSnapshot(MlbState.selectEventById)(id);
  selectTeamById = (id: number) => this.store.selectSnapshot(MlbState.selectTeamById)(id);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Dispatch() getLeague = (leagueId: number) => new FetchBaseballLeague(leagueId);
}
