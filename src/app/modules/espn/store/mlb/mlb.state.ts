import { Injectable } from '@angular/core';
import { insertionSortDesc } from '@app/@shared/helpers/algos';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { teamMap } from 'src/app/@shared/helpers/mapping';
import { EspnService } from '../../espn.service';
import { Game } from '../../models/mlb/class/game.class';
import { BaseballTeam } from '../../models/mlb/class/team.class';
import { Team } from '../../models/mlb/interface';
import { ScheduleEntry } from '../../models/mlb/interface/league';
import { MlbAction, FetchBaseballLeague } from './mlb.actions';

export interface MlbStateModel {
  items: string[];
  schedule: ScheduleEntry[];
  teams: { [id: number]: Team };
  games: { [id: number]: Game };
  isLoading: boolean;
  scoringPeriodId: number;
}

@State<MlbStateModel>({
  name: 'mlb',
  defaults: {
    scoringPeriodId: null,
    schedule: [],
    teams: {},
    games: {},
    items: [],
    isLoading: true
  }
})

@Injectable()
export class MlbState {

  constructor(private espnService: EspnService) { }

  @Selector()
  public static getState(state: MlbStateModel) {
    return state;
  }

  @Selector([MlbState.getState])
  public static isLoading(_: MlbStateModel, getState: MlbStateModel) {
    return getState.isLoading;
  }

  @Selector([MlbState.getState])
  public static scoringPeriod(_: MlbStateModel, getState: MlbStateModel) {
    return getState.scoringPeriodId;
  }

  @Selector()
  public static schedule(state: MlbStateModel) {
    return state.schedule;
  }

  @Selector([MlbState.schedule])
  public static teams(state: MlbStateModel, schedule: ScheduleEntry[]): Map<number, BaseballTeam> {
    return teamMap(Object.values(state.teams), schedule);
  }

  @Selector([MlbState.teams])
  public static scoreboard(_: MlbStateModel, teams: Map<number, BaseballTeam>) {
    return insertionSortDesc([...teams.values()], 'liveScore');
  }


  @Action(MlbAction)
  public add(ctx: StateContext<MlbStateModel>, { payload }: MlbAction) {
    const stateModel = ctx.getState();
    stateModel.items = [...stateModel.items, payload];
    ctx.setState(stateModel);
  }


  @Action(FetchBaseballLeague)
  public baseballLeague(ctx: StateContext<MlbStateModel>, { leagueId }: FetchBaseballLeague) {
    const state = ctx.getState();
    return this.espnService.fetchEspnBaseball(leagueId).pipe(
      tap(([league, mlbGames]) => {

        const teams = league.teams.reduce((map, obj) => {
          map[obj.id] = obj;
          return map;
        }, {});


        ctx.patchState({ teams, schedule: [...league.schedule], isLoading: false, scoringPeriodId: league.scoringPeriodId });
        // schedule: league.schedule
        // leagueId: league.id,
        // scoringPeriodId: league.scoringPeriodId,
        // leagueName: league.settings.name,
        // games: [...mapToArr(mappedGames)],
        // isLoading: false
        // });
      }),
      catchError(err => err)
    );
  }

}


