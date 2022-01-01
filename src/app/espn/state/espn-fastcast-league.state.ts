import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';

import { EspnFastcastService } from '../espn-fastcast.service';
import { EspnService } from '../espn.service';
import { FastcastEvent } from '../models/fastcast-event.model';
import { SportsEntity as SportsImport, LeaguesEntity as LeaguesImport, EventsEntity as EventsImport } from '../models/espn-fastcast.model';

export class PatchFastcastLeague {
  static readonly type = `[fastcastLeague] PatchFastcastLeague`;
  constructor(public payload: { map: { [id: string]: LeaguesImport } }) {}
}

export interface EspnFastcastLeagueModel {
  map: { [id: string]: LeaguesImport };
}

export enum FastCastSportSlug {
  Basketball = 'basketball',
  Baseball = 'baseball',
  Soccer = 'soccer',
  MMA = 'mma',
  Football = 'football',
  Hockey = 'hockey',
}

@State<EspnFastcastLeagueModel>({
  name: 'fastcastLeague',
  defaults: {
    map: {},
  },
})
@Injectable()
export class EspnFastcastLeagueState {
  constructor(private fastcastService: EspnFastcastService, private espnService: EspnService, private store: Store) {}

  @Selector()
  static selectMap(state: EspnFastcastLeagueModel): { [id: string]: LeaguesImport } {
    return state.map;
  }

  @Action(PatchFastcastLeague)
  patchFastcastLeague({ patchState, getState }: StateContext<EspnFastcastLeagueModel>, { payload: { map } }: PatchFastcastLeague) {
    const state = getState();

    patchState({ ...state, map });
  }
}
