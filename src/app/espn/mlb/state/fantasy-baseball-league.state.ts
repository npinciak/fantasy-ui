import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { FetchBaseballLeague, PatchLiveSchedule, PatchScoringPeriodId, PatchSeasonId } from '../actions/mlb.actions';
import { MlbService } from '../services/mlb.service';
import { SetEspnFantasyLeagueTeamsLive } from './fantasy-baseball-team-live.state';
import { PatchFantasyBaseballTeams } from './fantasy-baseball-team.state';

export interface FantasyBaseballLeagueStateModel {
  isLoading: boolean;
  scoringPeriodId: string | null;
  seasonId: string | null;
  schedule: Record<string, any>;
}

@State<FantasyBaseballLeagueStateModel>({
  name: 'fantasyBaseballLeague',
  defaults: {
    scoringPeriodId: null,
    isLoading: true,
    seasonId: null,
    schedule: {},
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
  static scoringPeriod(state: FantasyBaseballLeagueStateModel): string {
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
  ): Promise<void> {
    const state = getState();
    if (state.scoringPeriodId !== null) {
      console.log(`League ${leagueId} already in state, retrieving cache`);
      return;
    }

    const { scoringPeriodId, seasonId, teams, schedule, teamsLive } = await this.mlbService.baseballLeague(leagueId).toPromise();

    dispatch([
      new SetEspnFantasyLeagueTeamsLive({ teams: teamsLive }),
      new PatchLiveSchedule({ schedule }),
      new PatchSeasonId({ seasonId }),
      new PatchScoringPeriodId({ scoringPeriodId }),
      new PatchFantasyBaseballTeams({ teams }),
      // new FetchFantasyBaseballFreeAgents({ leagueId, scoringPeriodId }),
    ]);
  }

  @Action(PatchSeasonId)
  patchSeasonId({ patchState }: StateContext<FantasyBaseballLeagueStateModel>, { payload: { seasonId } }: PatchSeasonId): void {
    patchState({ seasonId });
  }

  @Action(PatchScoringPeriodId)
  patchScoringPeriodId(
    { patchState }: StateContext<FantasyBaseballLeagueStateModel>,
    { payload: { scoringPeriodId } }: PatchScoringPeriodId
  ): void {
    patchState({ scoringPeriodId });
  }

  @Action(PatchLiveSchedule)
  patchLiveSchedule({ patchState }: StateContext<FantasyBaseballLeagueStateModel>, { payload: { schedule } }: PatchLiveSchedule): void {
    patchState({ schedule });
  }
}
