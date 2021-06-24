import { Injectable } from '@angular/core';
import { gameMap, newTeamMap } from '@app/@shared/helpers/mapping';
import { entityMap } from '@app/@shared/operators/entities.operators';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { EspnService } from '../../espn.service';
import { Game } from '../../models/mlb/class/game.class';
import { BaseballTeam } from '../../models/mlb/class/team.class';
import { EspnEvent, Team } from '../../models/mlb/interface';
import { MlbStateModel, ScheduleState, TeamState } from './mlb-state.model';
import { FetchBaseballLeague } from './mlb.actions';


@State<MlbStateModel>({
  name: 'mlb',
  defaults: {
    scoringPeriodId: null,
    schedule: {},
    teams: {},
    games: {},
    isLoading: true
  }
})

@Injectable()
export class MlbState {

  constructor(private espnService: EspnService) { }

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
  static teams(state: MlbStateModel): TeamState {
    return state.teams;
  }

  @Selector([MlbState.teams])
  static teamsEmpty(_: MlbStateModel, teams: Map<number, BaseballTeam>) {
    return teams.size === 0;
  }

  @Selector()
  static selectTeamById(state: MlbStateModel): (id: number) => Team {
    return (id: number) => state.teams[id];
  }

  @Selector()
  static games(state: MlbStateModel): { [id: number]: EspnEvent } {
    return state.games;
  }

  @Selector()
  static gameMap(state: MlbStateModel): { [id: number]: Game } {
    return gameMap(state.games);
  }

  @Selector()
  static selectGameById(state: MlbStateModel): (id: number) => EspnEvent {
    return (id: number) => state.games[id];
  }

  @Selector([MlbState.teams, MlbState.schedule])
  static baseballTeamMap(_: MlbStateModel, teams: TeamState, schedule: ScheduleState) {
    return newTeamMap(teams, Object.values(schedule));
  }

  @Selector([MlbState.baseballTeamMap])
  static standings(_: MlbStateModel, teams: { [id: number]: BaseballTeam }) {
    return Object.values(teams);
  }

  @Selector([MlbState.baseballTeamMap])
  static liveScore(_: MlbStateModel, teams: { [id: number]: BaseballTeam }) {
    return Object.values(teams).sort((a, b) => b.liveScore - a.liveScore);
  }

  @Action(FetchBaseballLeague)
  baseballLeague(ctx: StateContext<MlbStateModel>, { leagueId }: FetchBaseballLeague) {
    return this.espnService.fetchEspnBaseball(leagueId).pipe(
      tap(([league, mlbGames]) => {

        const teams = entityMap(league.teams);
        const games = entityMap(mlbGames.events);
        const schedule = entityMap(league.schedule);

        ctx.patchState({
          teams,
          games,
          schedule,
          isLoading: false,
          scoringPeriodId: league.scoringPeriodId
        });
      })
    );
  }
}
