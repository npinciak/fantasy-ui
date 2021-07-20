import { Injectable } from '@angular/core';
import { gameMap, newTeamMap } from '@app/@shared/helpers/mapping';
import { entityMap } from '@app/@shared/operators/entities.operators';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { EspnService } from '@espn/espn.service';
import { Game } from '../class/game.class';
import { BaseballTeam } from '../class/team.class';
import { BaseballTeamMap, EventMap, GameMap, MlbStateModel, ScheduleMap, TeamMap } from './mlb-state.model';
import { FetchBaseballLeague } from '../actions/mlb.actions';
import { EspnEvent, Team } from '../interface';

@State<MlbStateModel>({
  name: 'mlb',
  defaults: {
    scoringPeriodId: null,
    schedule: {},
    teams: {},
    events: {},
    isLoading: true,
  },
})
@Injectable()
export class MlbState {
  constructor(private espnService: EspnService) {}

  @Selector()
  static getState(state: MlbStateModel) {
    return state;
  }

  @Selector([MlbState.getState])
  static isLoading(_: MlbStateModel, getState: MlbStateModel) {
    return getState.isLoading;
  }

  @Selector()
  static scoringPeriod(state: MlbStateModel) {
    return state.scoringPeriodId;
  }

  @Selector()
  static schedule(state: MlbStateModel) {
    return state.schedule;
  }

  @Selector()
  static teams(state: MlbStateModel): TeamMap {
    return state.teams;
  }

  @Selector()
  static events(state: MlbStateModel): EventMap {
    return state.events;
  }

  @Selector([MlbState.events])
  static eventToGame(_: MlbStateModel, event: EventMap): GameMap {
    return gameMap(event);
  }

  @Selector([MlbState.eventToGame])
  static sortedGamesByStartTime(_: MlbStateModel, games: GameMap): Game[] {
    return Object.values(games).sort((a, b) => a.gameDate.milli - b.gameDate.milli);
  }

  @Selector([MlbState.numberOfEvents])
  static noEvents(_: MlbStateModel, numberOfEvents: number): boolean {
    return numberOfEvents === 0;
  }

  @Selector([MlbState.events])
  static numberOfEvents(_: MlbStateModel, events: EventMap): number {
    return Object.keys(events).length;
  }

  @Selector()
  static selectEventById(state: MlbStateModel): (id: number) => EspnEvent {
    return (id: number) => state.events[id];
  }

  @Action(FetchBaseballLeague)
  baseballLeague(ctx: StateContext<MlbStateModel>, { leagueId }: FetchBaseballLeague) {
    if (ctx.getState().scoringPeriodId) {
      console.log(`League ${leagueId} already in state, retrieving cache`);
      return;
    }

    return this.espnService.fetchEspnBaseball(leagueId).pipe(
      tap(([league, mlbGames]) => {
        const teams = entityMap(league.teams);
        const events = entityMap(mlbGames.events);
        const schedule = entityMap(league.schedule);

        ctx.patchState({
          teams,
          events,
          schedule,
          isLoading: false,
          scoringPeriodId: league.scoringPeriodId,
        });
      })
    );
  }
}
