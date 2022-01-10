import { Matchup } from '@app/dfs/models/matchup.model';

interface MlbDfsMatchupProperties {
  teamTotal: number | null;
  team: string | null;
  stackValue: number | null;
  topValue: number | null;
  smashVal: number | null;
  stackLeverage: number | null;
  stackDiff: number | null;
}

export type MLBDfsMatchup = MlbDfsMatchupProperties & Matchup;
