import { DfsSiteType } from '../../dfs.const';

/* eslint-disable @typescript-eslint/naming-convention */
export interface SlateAttributes {
  games: GameAttributes;
  players: PlayerAttributes;
  teams: TeamAttributes;
}

export interface GameAttributes {
  id: string;
}

export interface PlayerAttributes {
  xml_id: string;
  team: string;
  // stats: ClientStats;
  // salary_diff: ClientSalaryDiff;
  // ownership: ClientOwnership;
  // slate_ownership: ClientSlateOwnership;
  // stat_group: string;
  // props: ClientProps;
  // ecr: ClientEcr;
  // smash_pct: ClientSmashPctOrValuePct;
  // value_pct: ClientSmashPctOrValuePct;
}

export interface TeamAttributes {
  team_total: number;
  pitcher: {
    last_name: string;
    first_name: string;
    hand: 'L' | 'R';
    id: string;
  };
  stack_value: ClientTeamAttrValueSite;
  top_value: ClientTeamAttrValueSite;
  smash_value: ClientTeamAttrValueSite;
  stack_leverage: ClientTeamAttrValueSite;
  stack_field: ClientTeamAttrValueSite;
  stack_diff: ClientTeamAttrValueSite;
  vegas: ClientVegasAttr;
}

export interface ClientTeamAttrValueSite {
  draftkings: string;
  fanduel: string;
  yahoo: string;
}

export interface ClientVegasAttr {
  'o/u': number;
  opp_total: number;
  total: number;
  line: number;
  movement: number;
}
