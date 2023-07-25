export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

type FangraphsConstants = {
  cFIP: number;
  id: number;
  'R/PA': number;
  'R/W': number;
  runCS: number;
  runSB: number;
  season: number;
  w1B: number;
  w2B: number;
  w3B: number;
  wBB: number;
  wHBP: number;
  wHR: number;
  wOBA: number;
  wOBAScale: number;
};

type League = {
  created_at: string | null;
  id: number;
  leagueId: string;
  name: string | null;
  ownerId: string;
  season: string | null;
  sport: string | null;
  expired: boolean;
};

type Team = {
  created_at: string | null;
  espnId: number;
  id: number;
  isFavorite: boolean | null;
  leagueId: string | null;
  name: string | null;
  ownerId: string;
};

type Table<T> = {
  Row: T;
  Insert: Partial<T>;
  Update: Partial<T>;
};

export interface Database {
  public: {
    Tables: {
      'fangraphs-constants': Table<FangraphsConstants>;
      Leagues: Table<League>;
      Teams: Table<Team>;
    };
  };
}
