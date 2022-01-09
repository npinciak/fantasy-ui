/* eslint-disable @typescript-eslint/naming-convention */
export interface DfsSlatePlayer {
  attributes: Attributes;
  fpts: number;
  player: Player;
  schedule: Schedule;
  stat_group: string;
  status?: null;
}

export interface Attributes {
  batting_order: BattingOrder;
}

export interface BattingOrder {
  order: string;
  confirmed: number;
}

export interface Player {
  id: string;
  rg_id: string;
  first_name: string;
  last_name: string;
  position: string;
  sport_id: string;
  team_id: string;
  rg_team_id?: string | null;
  xml_id?: string | null;
}

export interface Schedule {
  date: string;
  id: string;
  rg_id: string;
  sport_id: string;
  team_away: TeamAwayOrTeamHome;
  team_home: TeamAwayOrTeamHome;
  salaries?: SalariesEntity[] | null;
}

export interface TeamAwayOrTeamHome {
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

export type CoreSlatePlayer = Pick<DfsSlatePlayer, 'attributes'>;

export type CoreSchedule = Pick<Schedule, 'date' | 'id' | 'rg_id' | 'sport_id' | 'team_away' | 'team_home' | 'salaries'>;
