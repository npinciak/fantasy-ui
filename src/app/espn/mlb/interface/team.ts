import { EspnClientRoster } from './roster';

export interface EspnClientTeam {
  id: number;
  abbrev: string;
  location: string;
  nickname: string;
  roster: EspnClientRoster;
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
