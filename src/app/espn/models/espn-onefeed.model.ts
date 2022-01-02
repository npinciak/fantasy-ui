export interface EspnClientOneFeed {
  resultsOffset: number;
  resultsLimit: number;
  resultsCount: number;
  feed: FeedOverview[];
}

export interface FeedOverview {
  data: FeedOverviewData;
}

export interface FeedOverviewData {
  event: unknown;
  now: FeedEntity[];
}

export interface FeedEntity {
  inlines: FeedArticle[];
}

export interface FeedArticle {
  id: number;
  description: string;
  image: string;
  link: string;
  published: string;
  author: string;
}
