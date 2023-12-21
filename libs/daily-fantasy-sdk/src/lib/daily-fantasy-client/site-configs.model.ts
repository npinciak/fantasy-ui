import { DfsSport } from '../models/sport.model';
import { Site } from './site.model';
import { ClientSlateTypeConfig } from './slate.model';

export type SiteConfig = Record<DfsSport, Configs>;
export type SiteSlateConfig = Record<Site, SiteConfig>;

export interface Configs {
  id: number;
  types: ClientSlateTypeConfig;
}
