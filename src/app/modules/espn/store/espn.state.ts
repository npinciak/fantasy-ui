import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { EspnService } from '../espn.service';
import { BaseballPlayer } from '../models/mlb/class/player.class';
import { BaseballTeam } from '../models/mlb/class/team.class';
import { Player, Team } from '../models/mlb/interface';
import { ScheduleEntry } from '../models/mlb/interface/league';
import { EspnGetBaseballLeague } from './espn.actions';

export interface EspnStateModel {
  leagueId: number;
  leagueName: string;
  teams: any[];
  leagueSchedule: ScheduleEntry[];
  isLoading: boolean;
}
@State<EspnStateModel>({
  name: 'espn',
  defaults: {
    leagueId: null,
    leagueName: null,
    leagueSchedule: [],
    teams: [],
    isLoading: true
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
  public static isLoading(state: EspnStateModel) {
    return state.isLoading;
  }

  @Selector()
  public static teams(state: EspnStateModel) {
    return state.teams;
  }

  @Selector()
  public static schedule(state: EspnStateModel) {
    return state.leagueSchedule;
  }

  @Selector([EspnState.teams])
  public static teamsEmpty(_state: EspnStateModel, teams: any[]) {
    return teams.length === 0;
  }

  @Action(EspnGetBaseballLeague)
  public getBaseballLeague(ctx: StateContext<EspnStateModel>, { leagueId }: EspnGetBaseballLeague) {
    const numTeam = ctx.getState().teams.length;
    if (numTeam > 0) {
      console.log(`Found ${numTeam} teams, using cache`);
      return;
    }
    return this.espnService.getBaseballLeague(leagueId).pipe(
      tap(res => {

        const newTeams = this.newTeams(res.teams);

        ctx.patchState({
          leagueId: res.id,
          leagueName: res.settings.name,
          leagueSchedule: res.schedule,
          teams: newTeams,
          isLoading: false
        });
      }),
      catchError(err => err)
    );
  }


  private newTeams(teams: Team[]) {
    const t1 = performance.now();
    const arr = [];
    teams.forEach(team => { //O(n)
      const newTeam = new BaseballTeam(team);
      newTeam.roster = team.roster.entries;
      arr.push(newTeam);
    });
    const t2 = performance.now();

    console.log(t2 - t1);
    return arr;
  }

}
