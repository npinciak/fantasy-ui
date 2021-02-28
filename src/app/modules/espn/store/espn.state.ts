import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { EspnService } from '../espn.service';
import { FantasyTeam, League } from '../models';
import { FantasyLeague } from '../models/league.class';
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

  @Action(EspnAction)
  public add(ctx: StateContext<EspnStateModel>, { payload }: EspnAction) {
    const stateModel = ctx.getState();
    stateModel.items = [...stateModel.items, payload];
    ctx.setState(stateModel);
  }

  @Action(EspnAction)
  public getLeague(ctx: StateContext<EspnStateModel>, { leagueId, sport }: EspnGetLeague) {
    return this.espnService.getLeague(leagueId, sport).pipe(
      tap(res => {
        const stateModel = ctx.getState();
        const league = new FantasyLeague(res);
        stateModel.teams = league.teams;
        ctx.setState(stateModel);
      }),
      catchError(err => err)
    );

  }
}
