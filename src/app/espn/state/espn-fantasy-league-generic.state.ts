import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { FetchBaseballLeague } from '../mlb/actions/mlb.actions';
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
  selectedYear: string | null;
}

export function EspnFantasyLeagueGenericState({ name }: { name: string }): EspnFantasyLeagueGenericClass {
  @State<EspnFantasyLeagueGenericStateModel>({
    name: name,
    defaults: {
      map: {},
      isLoading: true,
      scoringPeriodId: null,
      selectedYear: null,
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
    static scoringPeriod(state: EspnFantasyLeagueGenericStateModel): string {
      return state.scoringPeriodId;
    }

    @Selector([EspnFantasyLeagueGenericStateBase.getState])
    static selectedYear(state: EspnFantasyLeagueGenericStateModel): string {
      return state.selectedYear;
    }

    constructor(private mlbService: MlbService) {}

    @Action(FetchBaseballLeague)
    async fetchLeague(
      { getState, patchState, dispatch }: StateContext<EspnFantasyLeagueGenericStateModel>,
      { payload: { leagueId } }: FetchBaseballLeague
    ) {
      const state = getState();
      if (state.scoringPeriodId) {
        console.log(`League ${leagueId} already in state, retrieving cache`);
        return;
      }

      const { scoringPeriodId, teams } = await this.mlbService.baseballLeague(leagueId).toPromise();

      dispatch([new PatchFantasyBaseballTeams({ teams }), new FetchFantasyBaseballFreeAgents({ leagueId, scoringPeriodId })]);

      // patchState({ scoringPeriodId });
    }
  }
  return EspnFantasyLeagueGenericStateBase;
}
