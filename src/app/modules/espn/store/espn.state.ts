import { LiteralMapEntry } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';

import { EspnService } from '../espn.service';
import { LeagueScoreboard } from '../models/mlb/class/leagueScoreboard.class';
import { BaseballPlayer } from '../models/mlb/class/player.class';
import { BaseballTeam } from '../models/mlb/class/team.class';
import { Player, Team } from '../models/mlb/interface';
import { ScheduleEntry, ScheduleTeams } from '../models/mlb/interface/league';
import { EspnGetBaseballLeague, EspnGetBaseballFA } from './espn.actions';

export interface EspnStateModel {
  leagueId: number;
  leagueName: string;
  teams: BaseballTeam[];
  freeAgents: BaseballPlayer[];
  isLoading: boolean;
}
@State<EspnStateModel>({
  name: 'espn',
  defaults: {
    leagueId: null,
    leagueName: null,
    teams: [],
    freeAgents: [],
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

  @Selector([EspnState.teams])
  public static scoreboard(_state: EspnStateModel, teams: BaseballTeam[]) {
    return teams.sort((a, b) => b.liveScore - a.liveScore);
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
        ctx.patchState({
          leagueId: res.id,
          leagueName: res.settings.name,
          teams: this.newTeams(res.teams, res.schedule),
          isLoading: false
        });
      }),
      catchError(err => err)
    );
  }


  @Action(EspnGetBaseballFA)
  public getBaseballFA(ctx: StateContext<EspnStateModel>, { leagueId }: EspnGetBaseballFA) {
    return this.espnService.getBaseballFA(leagueId).pipe(
      tap(res => {
        ctx.patchState({
          freeAgents: this.freeAgents(res.players),
          isLoading: false
        });
      }),
      catchError(err => err)
    );
  }



  private newTeams(teams: Team[], entries: ScheduleEntry[]) {

    const leagueScoreboard = new LeagueScoreboard();
    leagueScoreboard.teams = entries[0].teams;

    const liveScores = leagueScoreboard.scoreBoard;

    const arr = [];

    teams.map(team => {
      const newTeam = new BaseballTeam(team);
      newTeam.roster = team.roster.entries;
      if (liveScores.has(newTeam.teamId)) {
        newTeam.liveScore = liveScores.get(newTeam.teamId);
      }
      arr.push(newTeam);
    });

    return arr;
  }


  private freeAgents(players: Player[]) {
    const arr = [];
    players.map(player => {
      const freeAgent = new BaseballPlayer(player);
      arr.push(freeAgent);
    });
    return arr;
  }

}
