export interface Team {
  id: string;
  name: string;
  abbrev: string;
  logo: string;
  roster: any;
  totalPoints: number;
  currentRank: number;
  rankDiff: number;
}
