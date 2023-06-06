export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      'fangraphs-constants': {
        Row: {
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
        Insert: {
          cFIP?: number;
          id?: number;
          'R/PA'?: number;
          'R/W'?: number;
          runCS?: number;
          runSB?: number;
          season: number;
          w1B?: number;
          w2B?: number;
          w3B?: number;
          wBB?: number;
          wHBP?: number;
          wHR?: number;
          wOBA?: number;
          wOBAScale?: number;
        };
        Update: {
          cFIP?: number;
          id?: number;
          'R/PA'?: number;
          'R/W'?: number;
          runCS?: number;
          runSB?: number;
          season?: number;
          w1B?: number;
          w2B?: number;
          w3B?: number;
          wBB?: number;
          wHBP?: number;
          wHR?: number;
          wOBA?: number;
          wOBAScale?: number;
        };
      };
      Leagues: {
        Row: {
          created_at: string | null;
          id: number;
          leagueId: string | null;
          name: string | null;
          ownerId: string;
          season: string | null;
          sport: string | null;
          expired: boolean;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          leagueId?: string | null;
          name?: string | null;
          ownerId: string;
          season?: string | null;
          sport?: string | null;
          expired?: boolean;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          leagueId?: string | null;
          name?: string | null;
          ownerId?: string;
          season?: string | null;
          sport?: string | null;
          expired?: boolean;
        };
      };
      Teams: {
        Row: {
          created_at: string | null;
          espnId: number;
          id: number;
          isFavorite: boolean | null;
          leagueId: string | null;
          name: string | null;
          ownerId: string;
        };
        Insert: {
          created_at?: string | null;
          espnId?: number;
          id?: number;
          isFavorite?: boolean | null;
          leagueId?: string | null;
          name?: string | null;
          ownerId: string;
        };
        Update: {
          created_at?: string | null;
          espnId?: number;
          id?: number;
          isFavorite?: boolean | null;
          leagueId?: string | null;
          name?: string | null;
          ownerId?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
