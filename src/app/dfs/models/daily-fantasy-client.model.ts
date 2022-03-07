import { BattingAttributes } from '../mlb/models/mlb-client.model';

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

export interface Vegas {
  'o/u': number;
  opp_total: number;
  total: number;
  line: number;
  movement: number;
}

export type SlateMasterMap = { [site in ClientSite]: Record<string, SiteSlateEntity> };

export interface SiteSlateEntity {
  date: string;
  importId: string;
  name: string;
  games: SiteSlateGameEntity[] | null;
  start: string;
  type: string;
  salaryCap: number;
  slate_path: string;
  source: string;
  default: boolean;
  taggable: boolean;
  hidden: boolean;
}

export interface SiteSlateGameEntity {
  date: string;
  time: string;
  scheduleId: string;
  rgScheduleId: string | null;
  teamAwayId: string;
  rgTeamAwayId: string | null;
  teamHomeId: string;
  rgTeamHomeId: string | null;
  teamAwayHashtag: string;
  teamHomeHashtag: string;
}

/**
 * @deprecated use SiteSlateGameEntity
 */
export type DfsSlateGamesEntity = SiteSlateGameEntity;

export interface DfsSlatePlayer {
  attributes: BattingAttributes;
  fpts: number;
  player: SlatePlayerEntity;
  schedule: Schedule;
  stat_group: string;
  status: null;
}

export interface SlatePlayerEntity {
  id: string;
  rg_id: string;
  first_name: string;
  last_name: string;
  position: string;
  sport_id: string;
  team_id: string;
  rg_team_id: string | null;
  xml_id: string | null;
}

export interface Schedule {
  date: string;
  id: string;
  rg_id: string;
  sport_id: string;
  team_away: ScheduleTeamEntity;
  team_home: ScheduleTeamEntity;
  salaries: SalariesEntity[] | null;
}

export interface ScheduleTeamEntity {
  hashtag: string;
  id: string;
  rg_id: string;
  name: string;
}

export interface SalariesEntity {
  position: string;
  salary: number;
  player_id: string;
}
