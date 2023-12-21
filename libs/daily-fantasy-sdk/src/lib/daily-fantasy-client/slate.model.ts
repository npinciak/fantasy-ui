import { SLATE_TYPES } from '../models/daily-fantasy-client.const';
import { Site } from './site.model';

export type SlateType = typeof SLATE_TYPES[keyof typeof SLATE_TYPES];
export type DkSlateTypeMap = { [slateType in SlateType]: SlateConfig };

export type SiteSlateEntityMap = { [slateId: string]: SiteSlateEntity };
export type SlateMasterMap = { [site in Site]: SiteSlateEntityMap };
export type ClientSlateTypeConfig = { [slateType in SlateType]: SlateConfig };

type SiteSlateGameAtrributes = 'date' | 'time' | 'scheduleId' | 'teamAwayId' | 'teamHomeId' | 'teamAwayHashtag' | 'teamHomeHashtag';
export type SiteSlateGameEntity = { [attr in SiteSlateGameAtrributes]: string } & {
  rgScheduleId: string | null;
  rgTeamAwayId: string | null;
  rgTeamHomeId: string | null;
};

export interface SiteSlateEntity {
  date: string;
  importId: string;
  name: string;
  games: SiteSlateGameEntity[] | null;
  start: string;
  type: SlateType;
  salaryCap: number;
  slate_path: string;
}

export interface SlateConfig {
  salaryCap: number;
  slots: Slot[];
  fpts_multipliers: Multiplier;
}

export type Multiplier = Record<number, number>;

export type Slot = { posName: string; posOpts: Record<number, string> };
