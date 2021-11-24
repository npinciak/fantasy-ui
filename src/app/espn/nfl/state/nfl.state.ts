import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext, Store } from '@ngxs/store';

import { EspnService } from '@espn/espn.service';
import { NflStateModel } from './nfl.state.model';
import { FetchFootballLeague } from '../actions/nfl.actions';
import { NflService } from '../services/nfl.service';
import { PatchEvents } from './nfl-event.state';
@State<NflStateModel>({
  name: 'nfl',
  defaults: {
    scoringPeriodId: null,
    schedule: {},
    teams: {},
    events: {},
    isLoading: true,
  },
})
@Injectable()
export class NflState {
  constructor(private nflService: NflService, private store: Store) {}

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

    const league = await this.nflService.footballLeague(leagueId).toPromise();
    const events = await this.nflService.footballEvents().toPromise();

    this.store.dispatch(new PatchEvents({ events }));
  }
}
