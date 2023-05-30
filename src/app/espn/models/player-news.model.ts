import { ArticleEntity } from '@app/@shared/base-models/base-article.model';
import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import { EspnClient } from 'sports-ui-sdk';

export type PlayerNewsEntity = ArticleEntity & { storyImages: EspnClient.ImagesEntity[]; type: string };

export type PlayerNews = Pick<PlayerEntity, 'id'> & { news: PlayerNewsEntity[] };
