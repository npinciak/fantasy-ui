import { FootballPlayer } from './football-player.model';

/**
 * Move to <Pick>
 */
export interface FootballTeamProperties {
  id: string;
  name: string;
  logo: string;
  wins: number;
  losses: number;
  ties: number;
  pointsAgainst: number;
  pointsScored: number;
  currentRank: number;
  winPct: number;
  scoringRatio: number | null;
  predictedWinPct: number | null;
  predictedWinPctDiff: number | null;
  predictedWins: number | null;
  absoluteError: number | null;
  abbrev: string;
  roster: FootballPlayer[];
}

export type FootballTeam = FootballTeamProperties;
