type MatchupAttributes = 'teamTotal' | 'stackValue' | 'topValue' | 'smashVal' | 'stackLeverage' | 'stackDiff';
type MlbDfsMatchupProperties = { [key in MatchupAttributes]: number | null } & {
  team: string | null;
  teamId: string;
};

export type MLBDfsMatchup = MlbDfsMatchupProperties;
