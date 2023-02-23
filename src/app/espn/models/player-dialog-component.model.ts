import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import { PlayerNewsEntity } from './player-news.model';

export type PlayerDialog<T extends PlayerEntity> = {
  player: T;
  news: PlayerNewsEntity[];
  sport: 'nfl' | 'mlb';
};
