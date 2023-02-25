/**
 * Base front end article model
 *
 * Any article related models should extend this model
 */
type BaseArticleEntityProps = 'id' | 'headline' | 'story' | 'published';

export type ArticleEntity = Required<
  { [key in BaseArticleEntityProps]: string } & {
    author: string | null;
    heroImage: string | null;
  }
>;
