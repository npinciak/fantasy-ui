/* eslint-disable @typescript-eslint/naming-convention */
export interface GameAttrTeams {
  teams: GameAttrTeam;
}
export interface GameAttrTeam {
  [id: number]: TeamAttr;
}
export interface TeamAttr {
  stack_value: TeamAttrValueSite;
  top_value: TeamAttrValueSite;
  smash_value: TeamAttrValueSite;
  stack_leverage: TeamAttrValueSite;
  stack_field: TeamAttrValueSite;
  stack_diff: TeamAttrValueSite;
  pitcher: Pitcher;
  vegas: Vegas;
  team_total: number;
}
export interface TeamAttrValueSite {
  draftkings: string;
  fanduel: string;
  yahoo: string;
}
export interface Pitcher {
  last_name: string;
  first_name: string;
  hand: string;
  id: string;
}
export interface Vegas {
  'o/u': number;
  opp_total: number;
  total: number;
  line: number;
  movement: number;
}
