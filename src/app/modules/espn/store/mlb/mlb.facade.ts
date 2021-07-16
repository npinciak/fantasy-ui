import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Game } from '../../models/mlb/class/game.class';
import { BaseballTeam } from '../../models/mlb/class/team.class';

import { EventState, ScheduleState, TeamState } from './mlb-state.model';
import { FetchBaseballLeague } from './mlb.actions';
import { MlbState } from './mlb.state';

@Injectable({
  providedIn: 'root',
})
export class MlbFacade {
  @Select(MlbState.teams) public teams$: Observable<TeamState>;
  @Select(MlbState.games) public games$: Observable<EventState>;
  @Select(MlbState.standings) public standings$: Observable<BaseballTeam[]>;
  @Select(MlbState.schedule) public schedule$: Observable<ScheduleState>;
  @Select(MlbState.liveScore) public liveScore$: Observable<BaseballTeam[]>;
  @Select(MlbState.gamesMap) public gamesMap$: Observable<{
    [id: number]: Game;
  }>;

  @Select(MlbState.sortedGamesByStartTime)
  public sortedGamesByStartTime$: Observable<Game[]>;

  @Select(MlbState.noGames) public noGames$: Observable<boolean>;

  @Select(MlbState.teamsEmpty) public teamsEmpty$: Observable<boolean>;
  @Select(MlbState.isLoading) public isLoading$: Observable<boolean>;

  @SelectSnapshot(MlbState.scoringPeriod) public scoringPeriod: number;
  @SelectSnapshot(MlbState.teams) public teamsSnapshot: TeamState;
  @SelectSnapshot(MlbState.teamsEmpty) public teamsEmpty: boolean;
  @SelectSnapshot(MlbState.games) public gameSnapshot: EventState;

  constructor(private store: Store) {}

  selectGameById = (id: number) =>
    this.store.selectSnapshot(MlbState.selectGameById)(id);
  selectTeamById = (id: number) =>
    this.store.selectSnapshot(MlbState.selectTeamById)(id);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Dispatch() getLeague = (leagueId: number) =>
    new FetchBaseballLeague(leagueId);
}
