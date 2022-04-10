import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { FetchBaseballLeague, PatchScoringPeriodId, PatchSeasonId } from '../actions/mlb.actions';
import { MlbService } from '../services/mlb.service';
import { FetchFantasyBaseballFreeAgents } from './fantasy-baseball-free-agents.state';
import { PatchFantasyBaseballTeams } from './fantasy-baseball-team.state';

export interface FantasyBaseballLeagueStateModel {
  isLoading: boolean;
  scoringPeriodId: number | null;
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
  static scoringPeriod(state: FantasyBaseballLeagueStateModel): number {
    return state.scoringPeriodId;
  }

  @Selector([FantasyBaseballLeagueState.getState])
  static seasonId(state: FantasyBaseballLeagueStateModel): string {
    return state.seasonId;
  }

  @Action(FetchBaseballLeague)
  async baseballLeague(
    { getState, patchState, dispatch }: StateContext<FantasyBaseballLeagueStateModel>,
    { payload: { leagueId } }: FetchBaseballLeague
  ) {
    const state = getState();
    if (state.scoringPeriodId) {
      console.log(`League ${leagueId} already in state, retrieving cache`);
      return;
    }

    const { scoringPeriodId, seasonId, teams } = await this.mlbService.baseballLeague(leagueId).toPromise();

    dispatch([
      new PatchSeasonId({ seasonId }),
      new PatchScoringPeriodId({ scoringPeriodId }),
      new PatchFantasyBaseballTeams({ teams }),
      new FetchFantasyBaseballFreeAgents({ leagueId, scoringPeriodId }),
    ]);
  }

  @Action(PatchSeasonId)
  patchSeasonId({ patchState }: StateContext<FantasyBaseballLeagueStateModel>, { payload: { seasonId } }: PatchSeasonId) {
    patchState({ seasonId });
  }

  @Action(PatchScoringPeriodId)
  patchScoringPeriodId(
    { patchState }: StateContext<FantasyBaseballLeagueStateModel>,
    { payload: { scoringPeriodId } }: PatchScoringPeriodId
  ) {
    patchState({ scoringPeriodId });
  }
}
