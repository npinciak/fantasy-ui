import { Team } from './team.model';

export interface FastcastEventTeamProperties extends Team {
  score: string | null;
  abbrev: string | null;
  isWinner: boolean;
  color: string | null;
  altColor: string | null;
  rank: number | null;
  winPct: number | null;
  hasPossession: boolean;
  inRedzone: boolean;
}

export type FastcastEventTeam = FastcastEventTeamProperties;
