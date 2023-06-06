import { BattingAttributes } from './mlb-client.model';
import { DfsSite } from './site.model';
import { SlateType } from './slate.model';
import { DfsSport } from './sport.model';

export type DkSlateTypeMap = { [slateType in SlateType]: SlateConfig };
export type SiteSlateConfig = { [site in DfsSite]: SiteConfig };
export type SiteConfig = { [league in DfsSport]: Configs };
export type ClientSlateTypeConfig = { [slateType in SlateType]: SlateConfig };

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
export type ClientVegas = { [attr in VegasAttributes]: number };

export type SiteSlateEntityMap = { [slateId: string]: SiteSlateEntity };
export type SlateMasterMap = { [site in DfsSite]: SiteSlateEntityMap };

export interface SiteSlateEntity {
  date: string;
  importId: string;
  name: string;
  games: SiteSlateGameEntity[] | null;
  start: string;
  type: SlateType;
  salaryCap: number;
  slate_path: string;
  source: string;
  default: boolean;
  taggable: boolean;
  hidden: boolean;
}

type SiteSlateGameAtrributes = 'date' | 'time' | 'scheduleId' | 'teamAwayId' | 'teamHomeId' | 'teamAwayHashtag' | 'teamHomeHashtag';
export type SiteSlateGameEntity = { [attr in SiteSlateGameAtrributes]: string } & {
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

type ExpertConsensusRankAttributes = 'rank | avg';
export type ExpertConsensusRank = { [attr in ExpertConsensusRankAttributes]: string };
export type ExpertConsensusRankByDfsSite = Record<DfsSite, ExpertConsensusRank>;

type SlatePlayerAttributes = 'id' | 'rg_id' | 'first_name' | 'last_name' | 'position' | 'sport_id' | 'team_id';
export type SlatePlayerEntity = { [attr in SlatePlayerAttributes]: string } & {
  rg_team_id: string | null;
  xml_id: string | null;
};

type ScheduleAttributes = 'id' | 'rg_id' | 'sport_id' | 'date';
export type Schedule = { [attr in ScheduleAttributes]: string } & {
  team_away: ScheduleTeamEntity;
  team_home: ScheduleTeamEntity;
  salaries: SalariesEntity[] | null;
};

type ScheduleTeamAttributes = 'id' | 'rg_id' | 'hashtag' | 'name';
export type ScheduleTeamEntity = { [attr in ScheduleTeamAttributes]: string };

export interface SalariesEntity {
  position: string;
  salary: number;
  player_id: string;
}
