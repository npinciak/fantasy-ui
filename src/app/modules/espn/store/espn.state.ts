import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { EspnService } from '../espn.service';
import { FantasyTeam, League } from '../models';
import { FantasyLeague, MLBFantasyLeague } from '../models/league.class';
import { EspnAction, EspnGetLeague } from './espn.actions';


export interface EspnStateModel {
  items: string[];
  teams: FantasyTeam[];
}

export enum Sports {
  mlb = 'flb',
  nfl = 'ffl',
}

@State<EspnStateModel>({
  name: 'espn',
  defaults: {
    items: [],
    teams: []
  }
})

@Injectable()
export class EspnState {
  constructor(private espnService: EspnService) { }

  @Selector()
  public static getState(state: EspnStateModel) {
    return state;
  }

  @Selector()
  public static teams(state: EspnStateModel) {
    return state.teams;
  }

  @Action(EspnAction)
  public add(ctx: StateContext<EspnStateModel>, { payload }: EspnAction) {
    const stateModel = ctx.getState();
    stateModel.items = [...stateModel.items, payload];
    ctx.setState(stateModel);
  }

  @Action(EspnGetLeague)
  public getLeague(ctx: StateContext<EspnStateModel>, { leagueId, sport }: EspnGetLeague) {
    return this.espnService.getLeague(leagueId, sport).pipe(
      tap(res => {
        switch (sport) {
          case Sports.mlb:
            ctx.patchState({ teams: new MLBFantasyLeague(res).teams });
            break;
          case Sports.nfl:
            // ctx.patchState({ teams: new NFLFantasyLeague(res).teams });
            break;
          default:
            break;
        }

      }),
      catchError(err => err)
    );

  }
}
