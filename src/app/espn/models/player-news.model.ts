import { ArticleEntity } from '@app/@shared/base-models/base-article.model';
import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import { ImagesEntity } from 'sports-ui-sdk/lib/espn/models/espn-client.model';

export type PlayerNewsEntity = ArticleEntity & { storyImages: ImagesEntity[]; type: string };

export type PlayerNews = Pick<PlayerEntity, 'id'> & { news: PlayerNewsEntity[] };
