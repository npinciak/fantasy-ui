import { BattingAttributes } from './mlb-client.model';

export enum ClientSite {
  Draftkings = 'draftkings',
  Fanduel = 'fanduel',
  Yahoo = 'yahoo',
  Superdraft = 'superdraft',
}

export enum ClientSlateTypes {
  Classic = 'classic',
  Showdown = 'showdown',
  Pickem = 'pickem',
  Short = 'short',
}

export enum ClientLeague {
  MLB = 'mlb',
  NFL = 'nfl',
  NBA = 'nba',
}

export type SlateTypeMap = { [slateType in ClientSlateTypes]: SlateConfig };

export type SiteSlateConfig = { [site in ClientSite]: SiteConfig };
export type SiteConfig = { [league in ClientLeague]: Configs };
export type ClientSlateTypeConfig = { [slateType in ClientSlateTypes]: SlateConfig };

export interface Configs {
  id: number;
  types: ClientSlateTypeConfig;
}

export interface SlateConfig {
  salaryCap: number;
  slots: Slot[];
  fpts_multipliers: Multiplier;
}

export type Multiplier = Record<number, number>;

export type Slot = { posName: string; posOpts: Record<number, string> };

type VegasAttributes = 'o/u' | 'opp_total' | 'total' | 'line' | 'movement';
export type ClientVegas = { [key in VegasAttributes]: number };

export type ClientSiteSlateEntity = Record<string, SiteSlateEntity>;

export type SlateMasterMap = { [site in ClientSite]: Record<string, SiteSlateEntity> };

export interface SiteSlateEntity {
  date: string;
  importId: string;
  name: string;
  games: SiteSlateGameEntity[] | null;
  start: string;
  type: ClientSlateTypes;
  salaryCap: number;
  slate_path: string;
  source: string;
  default: boolean;
  taggable: boolean;
  hidden: boolean;
}

type SiteSlateGameAtrributes = 'date' | 'time' | 'scheduleId' | 'teamAwayId' | 'teamHomeId' | 'teamAwayHashtag' | 'teamHomeHashtag';
export type SiteSlateGameEntity = { [key in SiteSlateGameAtrributes]: string } & {
  rgScheduleId: string | null;
  rgTeamAwayId: string | null;
  rgTeamHomeId: string | null;
};

export interface DfsSlatePlayer {
  attributes: BattingAttributes;
  fpts: number;
  player: SlatePlayerEntity;
  schedule: Schedule;
  stat_group: string;
  status: null;
}

type SlatePlayerAttributes = 'id' | 'rg_id' | 'first_name' | 'last_name' | 'position' | 'sport_id' | 'team_id';
export type SlatePlayerEntity = { [key in SlatePlayerAttributes]: string } & {
  rg_team_id: string | null;
  xml_id: string | null;
};

type ScheduleAttributes = 'id' | 'rg_id' | 'sport_id' | 'date';
export type Schedule = { [key in ScheduleAttributes]: string } & {
  team_away: ScheduleTeamEntity;
  team_home: ScheduleTeamEntity;
  salaries: SalariesEntity[] | null;
};

type ScheduleTeamAttributes = 'id' | 'rg_id' | 'hashtag' | 'name';
export type ScheduleTeamEntity = { [key in ScheduleTeamAttributes]: string };

export interface SalariesEntity {
  position: string;
  salary: number;
  player_id: string;
}
