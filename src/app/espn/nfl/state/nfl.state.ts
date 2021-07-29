import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';

import { EspnService } from '@espn/espn.service';
import { NflStateModel } from './nfl.state.model';
import { FetchFootballLeague } from '../actions/nfl.actions';
import { entityMap } from '@app/@shared/operators';
import { tap } from 'rxjs/operators';
import { NflService } from '../services/nfl.service';
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
  constructor(private nflService: NflService) {}

  @Selector()
  static scoringPeriod(state: NflStateModel) {
    return state.scoringPeriodId;
  }

  @Action(FetchFootballLeague)
  footballLeague(ctx: StateContext<NflStateModel>, { leagueId }: FetchFootballLeague) {
    if (NflState.scoringPeriod !== null) {
      console.log(`League ${leagueId} already in state, retrieving cache`);
      return;
    }

    return this.nflService.fetchFootballLeague(leagueId);
  }
}
