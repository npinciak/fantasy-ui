import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { State, Action, Selector, StateContext, Store } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { EspnService } from '../espn.service';
import { FantasyTeam } from '../models';
import { MLBFantasyLeague } from '../models/mlb/league.class';
import { MLBFantasyTeam } from '../models/mlb/team.class';
import { EspnAction, EspnGetLeague, EspnGetTeamById } from './espn.actions';


export interface EspnStateModel {
  teams: FantasyTeam[];
}

export enum Sports {
  mlb = 'flb',
  nfl = 'ffl',
}

@State<EspnStateModel>({
  name: 'espn',
  defaults: {
    teams: [],
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

  @Selector([EspnState.teams])
  public static teamsEmpty(_state: EspnStateModel, teams: FantasyTeam[]) {
    return teams.length === 0;
  }

  @Action(EspnGetLeague)
  public getLeague(ctx: StateContext<EspnStateModel>, { leagueId, sport }: EspnGetLeague) {
    const numTeam = ctx.getState().teams.length;
    if (numTeam > 0) {
      console.log(`Found ${numTeam} teams, using cache`);
      return;
    }
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
