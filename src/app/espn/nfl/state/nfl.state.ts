import { Injectable } from '@angular/core';
import { EspnService } from '@app/espn/espn.service';
import { State, Action, Selector, StateContext, Store } from '@ngxs/store';

import { FetchFootballLeague } from '../actions/nfl.actions';
import { NflService } from '../services/nfl.service';
import { PatchFantasyFootballSchedule } from './fantasy-football-schedule';
import { PatchFantasyFootballTeams } from './fantasy-football-teams';

interface NflStateModel {
  seasonId: number | null;
  scoringPeriodId: number | null;
  isLoading: boolean;
}

@State<NflStateModel>({
  name: 'nfl',
  defaults: {
    seasonId: null,
    scoringPeriodId: null,
    isLoading: true,
  },
})
@Injectable()
export class NflState {
  constructor(private espnService: EspnService, private nflService: NflService, private store: Store) {}

  @Selector()
  static scoringPeriod(state: NflStateModel) {
    return state.scoringPeriodId;
  }

  @Action(FetchFootballLeague)
  async footballLeague({ getState, patchState, dispatch }: StateContext<NflStateModel>, { leagueId }: FetchFootballLeague) {
    const state = getState();

    // if (NflState.scoringPeriod !== null) {
    //   console.log(`League ${leagueId} already in state, retrieving cache`);
    //   return;
    // }
    const league = await this.nflService.footballLeague(Number(leagueId)).toPromise();

    const scoringPeriodId = league.scoringPeriodId;
    const seasonId = league.seasonId;
    const schedule = league.schedule;
    const teams = league.teams;

    dispatch([new PatchFantasyFootballSchedule({ schedule }), new PatchFantasyFootballTeams({ teams })]);
    patchState({ ...state, scoringPeriodId, seasonId });
  }
}
