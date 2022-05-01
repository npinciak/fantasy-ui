import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { FetchBaseballLeague, PatchScoringPeriodId, PatchSeasonId } from '../mlb/actions/mlb.actions';
import { MlbService } from '../mlb/services/mlb.service';
import { FetchFantasyBaseballFreeAgents } from '../mlb/state/fantasy-baseball-free-agents.state';
import { PatchFantasyBaseballTeams } from '../mlb/state/fantasy-baseball-team.state';

export interface EspnFantasyLeagueGenericClass {
  new (...args: any[]): any;
}

export interface EspnFantasyLeagueGenericStateModel {
  map: {};
  isLoading: boolean;
  scoringPeriodId: string | null;
  seasonId: string | null;
}

export function EspnFantasyLeagueGenericState({ name }: { name: string }): EspnFantasyLeagueGenericClass {
  @State<EspnFantasyLeagueGenericStateModel>({
    name: name,
    defaults: {
      map: {},
      isLoading: true,
      scoringPeriodId: null,
      seasonId: null,
    },
  })
  @Injectable()
  class EspnFantasyLeagueGenericStateBase {
    @Selector([EspnFantasyLeagueGenericStateBase])
    static getState(state: EspnFantasyLeagueGenericStateModel): EspnFantasyLeagueGenericStateModel {
      return state;
    }

    @Selector([EspnFantasyLeagueGenericStateBase.getState])
    static isLoading(state: EspnFantasyLeagueGenericStateModel): boolean {
      return state.isLoading;
    }

    @Selector([EspnFantasyLeagueGenericStateBase.getState])
    static scoringPeriod(state: EspnFantasyLeagueGenericStateModel): string | null {
      return state.scoringPeriodId;
    }

    @Selector([EspnFantasyLeagueGenericStateBase.getState])
    static selectedYear(state: EspnFantasyLeagueGenericStateModel): string | null {
      return state.seasonId;
    }

    constructor(private mlbService: MlbService) {}

    @Action(FetchBaseballLeague)
    async fetchLeague(
      { getState, dispatch }: StateContext<EspnFantasyLeagueGenericStateModel>,
      { payload: { leagueId } }: FetchBaseballLeague
    ): Promise<void> {
      const state = getState();
      if (state.scoringPeriodId) {
        console.log(`League ${leagueId} already in state, retrieving cache`);
        return;
      }

      const { scoringPeriodId, teams, seasonId } = await this.mlbService.baseballLeague(leagueId).toPromise();

      dispatch([
        new PatchSeasonId({ seasonId }),
        new PatchScoringPeriodId({ scoringPeriodId }),
        new PatchFantasyBaseballTeams({ teams }),
        new FetchFantasyBaseballFreeAgents({ leagueId, scoringPeriodId }),
      ]);
    }

    @Action(PatchSeasonId)
    patchSeasonId({ patchState }: StateContext<EspnFantasyLeagueGenericStateModel>, { payload: { seasonId } }: PatchSeasonId): void {
      patchState({ seasonId });
    }

    @Action(PatchScoringPeriodId)
    patchScoringPeriodId(
      { patchState }: StateContext<EspnFantasyLeagueGenericStateModel>,
      { payload: { scoringPeriodId } }: PatchScoringPeriodId
    ): void {
      patchState({ scoringPeriodId });
    }
  }
  return EspnFantasyLeagueGenericStateBase;
}
