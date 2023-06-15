import { ClientSlateTypeConfig } from '../daily-fantasy-client/slate.model';
import { BattingAttributes } from './mlb-client.model';
import { DfsSport } from './sport.model';

export type SiteConfig = { [league in DfsSport]: Configs };

export interface Configs {
  id: number;
  types: ClientSlateTypeConfig;
}

export type Multiplier = Record<number, number>;

export type Slot = { posName: string; posOpts: Record<number, string> };

type VegasAttributes = 'o/u' | 'opp_total' | 'total' | 'line' | 'movement';
export type ClientVegas = { [attr in VegasAttributes]: number };

export interface DfsSlatePlayer {
  attributes: BattingAttributes;
  fpts: number;
  player: SlatePlayerEntity;
  schedule: Schedule;
  stat_group: string;
  status: null;
}


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
