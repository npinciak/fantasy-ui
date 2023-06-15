import { DfsSport } from '../models/sport.model';
import { Site } from './site.model';
import { ClientSlateTypeConfig } from './slate.model';

export type SiteConfig = { [league in DfsSport]: Configs };
export type SiteSlateConfig = { [site in Site]: SiteConfig };

export interface Configs {
  id: number;
  types: ClientSlateTypeConfig;
}
