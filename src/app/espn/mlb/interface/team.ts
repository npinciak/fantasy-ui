import { Roster } from './roster';

export interface Team {
  id: number;
  abbrev: string;
  location: string;
  nickname: string;
  roster: Roster;
  points: number;
  logo: string;
  playoffSeed: number;
  draftDayProjectedRank: number;
  currentProjectedRank: number;
  rankCalculatedFinal: number;
  pointsByStat: {
    [key: number]: number;
  };
  valuesByStat: {
    [key: number]: number;
  };
}
