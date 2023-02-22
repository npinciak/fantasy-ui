import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import { PlayerNewsFeedEntity } from 'sports-ui-sdk/lib/espn/models/espn-client.model';

export type PlayerDialog<T extends PlayerEntity> = {
  player: T;
  news: PlayerNewsFeedEntity[];
  sport: 'nfl' | 'mlb';
};
