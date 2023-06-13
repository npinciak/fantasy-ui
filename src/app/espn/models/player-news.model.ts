import { ArticleEntity } from '@app/@shared/base-models/base-article.model';
import { PlayerEntity } from '@app/@shared/base-models/base-player.model';
import { EspnClient } from '@sports-ui/ui-sdk/espn';
import { Article } from '@sports-ui/ui-sdk/espn-client';

export type PlayerNewsEntity = ArticleEntity & {
  storyImages: EspnClient.ImagesEntity[];
  type: Article;
  link: string | null;
};

export type PlayerNews = Pick<PlayerEntity, 'id'> & { news: PlayerNewsEntity[] };
