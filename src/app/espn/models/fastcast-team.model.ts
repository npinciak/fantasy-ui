export interface FastcastEventTeam {
  id: string;
  score: string;
  abbrev: string;
  logo: string | null;
  isWinner: boolean;
  name: string;
  color: string;
  altColor: string;
  record: string;
  rank: number | null;
  winPct: number | null;
  hasPossession: boolean;
}
