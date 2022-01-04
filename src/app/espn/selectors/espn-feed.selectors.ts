import { Selector } from '@ngxs/store';

import { FastcastEvent } from '../models/fastcast-event.model';
import { FeedArticle } from '../models/feed.model';
import { EspnFastcastState } from '../state/espn-fastcast.state';
import { EspnFeedState } from '../state/espn-feed.state';

export class EspnFeedSelectors {
  @Selector([EspnFeedState.selectMap])
  static selectArticleById(map: { [id: number]: FeedArticle }): (id: number) => FeedArticle {
    return (id: number) => map[id];
  }

  @Selector([EspnFeedState.selectMap])
  static selectArticleList(map: { [id: number]: FeedArticle }): FeedArticle[] {
    return Object.values(map);
  }
}
