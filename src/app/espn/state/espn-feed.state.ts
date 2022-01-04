import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { State, Selector, Action, StateContext } from '@ngxs/store';

import { EspnService } from '../espn.service';
import { FeedArticle } from '../models/feed.model';

export class FetchFeed {
  static readonly type = `[espnFeed] FetchFeed`;
}

export class PatchFeed {
  static readonly type = `[espnFeed] PatchFeed`;
  constructor(public payload: { feed: FeedArticle[] }) {}
}

export interface EspnFeedStateModel {
  map: { [id: string]: FeedArticle[] };
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
  async fetchEspnOnefeed({ dispatch }: StateContext<EspnFeedStateModel>) {
    const feed = await this.espnService.espnOneFeed().toPromise();

    dispatch(new PatchFeed({ feed }));
  }

  @Action(PatchFeed)
  patchEvents({ patchState, getState }: StateContext<EspnFeedStateModel>, { payload: { feed } }: PatchFeed) {
    const state = getState();
    const map = entityMap(feed);

    patchState({ ...state, map });
  }
}
