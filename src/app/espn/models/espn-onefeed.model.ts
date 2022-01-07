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
  now: FeedArticle[];
}

export interface FeedEntity {
  inlines: FeedArticle[];
}

export interface FeedArticle {
  id: number;
  moduleType: FeedArticleType | undefined;
  type: string;
  header: {
    images: Pick<FeedArticleImageMeta, 'url'>[];
    title: string | undefined;
    uid: string;
  };
  headline: string;
  description: string;
  images: FeedArticleImageMeta[];
  published: string;
  links: FeedArticleLinkProperties;
}

export interface FeedArticleImageMeta {
  caption: string;
  name: string;
  url: string;
  height: number;
  width: number;
}

export interface FeedArticleLinkProperties {
  web: {
    href: string;
  };
}

export enum FeedArticleType {
  Story = 'story',
  Media = 'media',
}
