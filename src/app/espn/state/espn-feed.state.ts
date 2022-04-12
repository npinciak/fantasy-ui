import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { FeedArticle, FeedArticleMap } from '../models/feed.model';
import { EspnService } from '../service/espn.service';

export class FetchFeed {
  static readonly type = `[espnFeed] FetchFeed`;
}

export class PatchFeed {
  static readonly type = `[espnFeed] PatchFeed`;
  constructor(public payload: { feed: FeedArticle[] }) {}
}

export interface EspnFeedStateModel {
  map: FeedArticleMap;
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
  static selectMap(state: EspnFeedStateModel): FeedArticleMap {
    return state.map;
  }

  @Action(FetchFeed)
  async fetchEspnOnefeed({ dispatch }: StateContext<EspnFeedStateModel>): Promise<void> {
    const feed = await this.espnService.espnOneFeed().toPromise();

    dispatch(new PatchFeed({ feed }));
  }

  @Action(PatchFeed)
  patchEvents({ patchState, getState }: StateContext<EspnFeedStateModel>, { payload: { feed } }: PatchFeed): void {
    const state = getState();
    const map = entityMap(feed);

    patchState({ ...state, map });
  }
}
