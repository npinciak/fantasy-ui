import { TeamAttributes } from '../mlb/models/slate.interface';

/**
 * Base matchup model
 */
interface MatchupProperties {
  teamId: string;
  matchupAttr: TeamAttributes;
}

export type Matchup = MatchupProperties;
