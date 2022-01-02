import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';

import { EspnService } from '../espn.service';
import { FeedArticle } from '../models/espn-onefeed.model';

export class FetchFeed {
  static readonly type = `[espnFeed] FetchFeed`;
}

export class PatchFeed {
  static readonly type = `[espnFeed] PatchFeed`;
  constructor(public payload: { feed: FeedArticle }) {}
}

export interface EspnFeedStateModel {
  map: { [id: string]: FeedArticle };
}

@State<EspnFeedStateModel>({
  name: 'espnFeed',
  defaults: {
    map: {},
  },
})
@Injectable()
export class EspnFeedState {
  constructor(private espnService: EspnService) {}

  @Selector()
  static selectMap(state: EspnFeedStateModel) {
    return state.map;
  }

  @Action(FetchFeed)
  async fetchEspnOnefeed() {
    const feed = this.espnService.espnOneFeed().toPromise();
  }

  @Action(PatchFeed)
  patchEvents({ patchState, getState }: StateContext<EspnFeedStateModel>, { payload: { feed } }: PatchFeed) {
    const state = getState();
    const lastRefresh = new Date().getTime();

    // patchState({ ...state, map });
  }
}
