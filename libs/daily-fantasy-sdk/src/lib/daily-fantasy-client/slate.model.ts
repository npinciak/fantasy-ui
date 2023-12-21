import { SLATE_TYPES } from '../models/daily-fantasy-client.const';
import { Site } from './site.model';

export type ClientSlateType = typeof SLATE_TYPES[keyof typeof SLATE_TYPES];
export type ClientSlateTypeConfig = Record<ClientSlateType, ClientSlateConfig>;
export type ClientDkSlateTypeMap = ClientSlateTypeConfig;
export type ClientSiteSlateEntityMap = Record<string, ClientSiteSlateEntity>;
export type ClientSlateMasterMap = Record<Site, ClientSiteSlateEntityMap>;

type SiteSlateGameAttributes = 'date' | 'time' | 'scheduleId' | 'teamAwayId' | 'teamHomeId' | 'teamAwayHashtag' | 'teamHomeHashtag';
export type ClientSiteSlateGameEntity = Record<SiteSlateGameAttributes, string> & {
  rgScheduleId: string | null;
  rgTeamAwayId: string | null;
  rgTeamHomeId: string | null;
};

export interface ClientSiteSlateEntity {
  date: string;
  importId: string;
  name: string;
  games: ClientSiteSlateGameEntity[] | null;
  start: string;
  type: ClientSlateType;
  salaryCap: number;
  slate_path: string;
}

export interface ClientSlateConfig {
  salaryCap: number;
  slots: ClientSlot[];
  fpts_multipliers: ClientMultiplier;
}

export type ClientMultiplier = Record<number, number>;

export type ClientSlot = { posName: string; posOpts: Record<number, string> };
