import { Injectable } from '@angular/core';
import { exists } from '@app/@shared/helpers/utils';
import { Selector } from '@app/@shared/models/typed-selector';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { SetFantasyBaseballEvents } from '../actions/fantasy-baseball-events.actions';
import { SetFantasyBaseballTeams } from '../actions/fantasy-baseball-team.actions';
import { FetchBaseballLeague, SetCurrentScoringPeriodId, SetLeagueId, SetSeasonId } from '../actions/mlb.actions';
import { MlbService } from '../services/mlb.service';
import { SetEspnFantasyLeagueTeamsLive } from './fantasy-baseball-team-live.state';

export interface FantasyBaseballLeagueStateModel {
  currentScoringPeriodId: number | null;
  firstScoringPeriodId: number | null;
  finalScoringPeriodId: number | null;
  seasonId: string | null;
  leagueId: string | null;
  isLoading: boolean;
}

@State<FantasyBaseballLeagueStateModel>({
  name: 'fantasyBaseballLeague',
  defaults: {
    currentScoringPeriodId: null,
    firstScoringPeriodId: null,
    finalScoringPeriodId: null,
    seasonId: null,
    leagueId: null,
    isLoading: false,
  },
})
@Injectable()
export class FantasyBaseballLeagueState {
  constructor(private mlbService: MlbService, private store: Store) {}

  @Selector([FantasyBaseballLeagueState])
  static getState(state: FantasyBaseballLeagueStateModel): FantasyBaseballLeagueStateModel {
    return state;
  }

  @Selector([FantasyBaseballLeagueState.getState])
  static getIsLoading(state: FantasyBaseballLeagueStateModel): boolean {
    return state.isLoading;
  }

  @Selector([FantasyBaseballLeagueState.getState])
  static getCurrentScoringPeriodId(state: FantasyBaseballLeagueStateModel): number | null {
    return state.currentScoringPeriodId;
  }

  @Selector([FantasyBaseballLeagueState.getState])
  static getFirstScoringPeriodId(state: FantasyBaseballLeagueStateModel): number | null {
    return state.firstScoringPeriodId;
  }

  @Selector([FantasyBaseballLeagueState.getState])
  static getFinalScoringPeriodId(state: FantasyBaseballLeagueStateModel): number | null {
    return state.finalScoringPeriodId;
  }

  @Selector([FantasyBaseballLeagueState.getState])
  static getSeasonId(state: FantasyBaseballLeagueStateModel): string | null {
    return state.seasonId;
  }

  @Selector([FantasyBaseballLeagueState.getState])
  static getLeagueId(state: FantasyBaseballLeagueStateModel): string | null {
    return state.leagueId;
  }

  @Selector([FantasyBaseballLeagueState.getLeagueId, FantasyBaseballLeagueState.getCurrentScoringPeriodId])
  static getLeagueStateValid(leagueId: string | null, scoringPeriodId: number | null): boolean {
    return exists(leagueId) && exists(scoringPeriodId);
  }

  @Action(FetchBaseballLeague)
  async baseballLeague(
    { patchState, dispatch }: StateContext<FantasyBaseballLeagueStateModel>,
    { payload: { leagueId } }: FetchBaseballLeague
  ): Promise<void> {
    patchState({ isLoading: true });

    const leagueValid = this.store.selectSnapshot(FantasyBaseballLeagueState.getLeagueStateValid);

    // if (leagueValid) {
    //   console.log(`League ${leagueId} already in state, retrieving cache`);
    //   return;
    // }

    if (!exists(leagueId)) {
      throw new Error('LeagueId cannot be null');
    }

    const year = new Date().getFullYear().toString();

    const { currentScoringPeriodId, firstScoringPeriodId, finalScoringPeriodId, seasonId, teams, teamsLive } = await this.mlbService
      .baseballLeague(leagueId, year)
      .toPromise();
    const events = await this.mlbService.baseballEvents().toPromise();

    dispatch([
      new SetEspnFantasyLeagueTeamsLive(teamsLive),
      new SetSeasonId({ seasonId }),
      new SetLeagueId({ leagueId }),
      new SetFantasyBaseballTeams(teams),
      new SetFantasyBaseballEvents(events),
    ]);

    patchState({ currentScoringPeriodId, finalScoringPeriodId, firstScoringPeriodId, isLoading: false });
  }

  @Action(SetSeasonId)
  setSeasonId({ patchState }: StateContext<FantasyBaseballLeagueStateModel>, { payload: { seasonId } }: SetSeasonId): void {
    patchState({ seasonId });
  }

  @Action(SetLeagueId)
  setLeagueId({ patchState }: StateContext<FantasyBaseballLeagueStateModel>, { payload: { leagueId } }: SetLeagueId): void {
    patchState({ leagueId });
  }

  @Action(SetCurrentScoringPeriodId)
  setCurrentScoringPeriodId(
    { patchState }: StateContext<FantasyBaseballLeagueStateModel>,
    { payload: { currentScoringPeriodId } }: SetCurrentScoringPeriodId
  ): void {
    patchState({ currentScoringPeriodId });
  }
}
