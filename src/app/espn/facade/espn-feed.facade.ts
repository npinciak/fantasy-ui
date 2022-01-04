import { Injectable } from '@angular/core';
import { Select, Selector, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FeedArticle } from '../models/feed.model';
import { EspnFeedSelectors } from '../selectors/espn-feed.selectors';

import { FetchFeed } from '../state/espn-feed.state';

@Injectable({
  providedIn: 'root',
})
export class EspnFeedFacade {
  @Select(EspnFeedSelectors.selectArticleList) articleList$: Observable<FeedArticle[]>;

  constructor(private store: Store) {}

  fetchFeed() {
    return this.store.dispatch(new FetchFeed());
  }
}
