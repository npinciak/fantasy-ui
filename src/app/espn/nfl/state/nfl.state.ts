import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';

import { EspnService } from '@espn/espn.service';
import { NflStateModel } from './nfl.state.model';
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
  constructor(private espnService: EspnService) {}
}
