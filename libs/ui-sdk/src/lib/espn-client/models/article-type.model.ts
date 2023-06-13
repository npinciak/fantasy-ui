import { ARTICLE_TYPE } from './article-type.const';

export type Article = typeof ARTICLE_TYPE[keyof typeof ARTICLE_TYPE];
