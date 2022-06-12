import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetFantasyBaseballEvents } from '../actions/fantasy-baseball-events.actions';
import { SetFantasyBaseballTeams } from '../actions/fantasy-baseball-team.actions';
import { FetchBaseballLeague, SetScoringPeriodId, SetSeasonId } from '../actions/mlb.actions';
import { MlbService } from '../services/mlb.service';
import { SetEspnFantasyLeagueTeamsLive } from './fantasy-baseball-team-live.state';

export interface FantasyBaseballLeagueStateModel {
  isLoading: boolean;
  scoringPeriodId: string | null;
  seasonId: string | null;
}

@State<FantasyBaseballLeagueStateModel>({
  name: 'fantasyBaseballLeague',
  defaults: {
    scoringPeriodId: null,
    isLoading: true,
    seasonId: null,
  },
})
@Injectable()
export class FantasyBaseballLeagueState {
  constructor(private mlbService: MlbService) {}

  @Selector([FantasyBaseballLeagueState])
  static getState(state: FantasyBaseballLeagueStateModel): FantasyBaseballLeagueStateModel {
    return state;
  }

  @Selector([FantasyBaseballLeagueState.getState])
  static isLoading(state: FantasyBaseballLeagueStateModel): boolean {
    return state.isLoading;
  }

  @Selector([FantasyBaseballLeagueState.getState])
  static scoringPeriod(state: FantasyBaseballLeagueStateModel): string | null {
    return state.scoringPeriodId;
  }

  @Selector([FantasyBaseballLeagueState.getState])
  static seasonId(state: FantasyBaseballLeagueStateModel): string | null {
    return state.seasonId;
  }

  @Action(FetchBaseballLeague)
  async baseballLeague(
    { getState, dispatch }: StateContext<FantasyBaseballLeagueStateModel>,
    { payload: { leagueId } }: FetchBaseballLeague
  ): Promise<void> {
    const state = getState();
    if (state.scoringPeriodId !== null) {
      console.log(`League ${leagueId} already in state, retrieving cache`);
      return;
    }

    const { scoringPeriodId, seasonId, teams, teamsLive } = await this.mlbService.baseballLeague(leagueId).toPromise();
    const events = await this.mlbService.baseballEvents().toPromise();

    dispatch([
      new SetEspnFantasyLeagueTeamsLive(teamsLive),
      new SetSeasonId({ seasonId }),
      new SetScoringPeriodId({ scoringPeriodId }),
      new SetFantasyBaseballTeams(teams),
      new SetFantasyBaseballEvents(events),
      // new FetchFantasyBaseballFreeAgents({ leagueId, scoringPeriodId }),
    ]);
  }

  @Action(SetSeasonId)
  patchSeasonId({ patchState }: StateContext<FantasyBaseballLeagueStateModel>, { payload: { seasonId } }: SetSeasonId): void {
    patchState({ seasonId });
  }

  @Action(SetScoringPeriodId)
  patchScoringPeriodId(
    { patchState }: StateContext<FantasyBaseballLeagueStateModel>,
    { payload: { scoringPeriodId } }: SetScoringPeriodId
  ): void {
    patchState({ scoringPeriodId });
  }
}
