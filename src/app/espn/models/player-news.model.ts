import { EspnClient } from 'sports-ui-sdk/lib/espn/espn.m';

export type PlayerNewsEntity = Pick<EspnClient.PlayerNewsFeedEntity, 'id' | 'headline' | 'story' | 'lastModified'>;

export type PlayerNews = {
  id: string;
  news: PlayerNewsEntity[];
};
