/**
 * Moved to daily-fantasy-client.model.ts
 *
 * @deprecated
 */
export interface GameAttrTeams {
  teams: GameAttrTeam;
}

/**
 * Moved to daily-fantasy-client.model.ts
 *
 * @deprecated
 */
export interface GameAttrTeam {
  [id: number]: TeamAttr;
}

/**
 * Moved to daily-fantasy-client.model.ts
 *
 * @deprecated
 */
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

/**
 * Moved to daily-fantasy-client.model.ts
 *
 * @deprecated
 */
export interface TeamAttrValueSite {
  draftkings: string;
  fanduel: string;
  yahoo: string;
}

/**
 * Moved to daily-fantasy-client.model.ts
 *
 * @deprecated
 */
export interface Pitcher {
  last_name: string;
  first_name: string;
  hand: string;
  id: string;
}

/**
 * Moved to daily-fantasy-client.model.ts
 *
 * @deprecated
 */
export interface Vegas {
  'o/u': number;
  opp_total: number;
  total: number;
  line: number;
  movement: number;
}
