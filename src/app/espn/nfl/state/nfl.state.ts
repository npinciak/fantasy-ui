import { Injectable } from '@angular/core';
import { EspnService } from '@app/espn/espn.service';
import { State, Action, Selector, StateContext, Store } from '@ngxs/store';

import { FetchFootballLeague } from '../actions/nfl.actions';
import { NflService } from '../services/nfl.service';

interface NflStateModel {
  scoringPeriodId: number | null;
  isLoading: boolean;
}

@State<NflStateModel>({
  name: 'nfl',
  defaults: {
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
  async footballLeague(ctx: StateContext<NflStateModel>, { leagueId }: FetchFootballLeague) {
    // if (NflState.scoringPeriod !== null) {
    //   console.log(`League ${leagueId} already in state, retrieving cache`);
    //   return;
    // }
    // const test = await this.espnService.espnFastcastEvents().toPromise();
    await this.nflService.footballLeague(Number(leagueId)).toPromise();

    // console.log(test);
  }
}
