import { Injectable } from '@angular/core';
import { Selector } from '@app/@shared/models/typed-selector';
import { State } from '@ngxs/store';

export interface FantasyLeagueBaseStateModel {
  id: string | null;
  seasonId: string | null;
  scoringPeriodId: string | null;
  firstScoringPeriod: string | null;
  finalScoringPeriod: string | null;
  matchupPeriodCount: string | null;
  isLoading: boolean;
}

const INITIAL_STATE = {
  id: null,
  seasonId: null,
  scoringPeriodId: null,
  firstScoringPeriod: null,
  finalScoringPeriod: null,
  matchupPeriodCount: null,
  isLoading: false,
};

export function FantasyLeagueBaseState({}: {}) {
  @State<FantasyLeagueBaseStateModel>({
    name: 'espnLeagueBaseState',
    defaults: INITIAL_STATE,
  })
  @Injectable()
  class EspnLeagueBaseStateClass {
    @Selector([EspnLeagueBaseStateClass])
    static getState(state: FantasyLeagueBaseStateModel) {
      return state;
    }
  }
  return EspnLeagueBaseStateClass;
}
