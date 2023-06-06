export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface SupabaseDatabase {
  public: {
    Tables: {
      'fangraphs-constants': {
        Row: {
          cFIP: number | null;
          id: number;
          'R/PA': number | null;
          'R/W': number | null;
          runCS: number | null;
          runSB: number | null;
          Season: number;
          w1B: number | null;
          w2B: number | null;
          w3B: number | null;
          wBB: number | null;
          wHBP: number | null;
          wHR: number | null;
          wOBA: number | null;
          wOBAScale: number | null;
        };
        Insert: {
          cFIP?: number | null;
          id?: number;
          'R/PA'?: number | null;
          'R/W'?: number | null;
          runCS?: number | null;
          runSB?: number | null;
          Season: number;
          w1B?: number | null;
          w2B?: number | null;
          w3B?: number | null;
          wBB?: number | null;
          wHBP?: number | null;
          wHR?: number | null;
          wOBA?: number | null;
          wOBAScale?: number | null;
        };
        Update: {
          cFIP?: number | null;
          id?: number;
          'R/PA'?: number | null;
          'R/W'?: number | null;
          runCS?: number | null;
          runSB?: number | null;
          Season?: number;
          w1B?: number | null;
          w2B?: number | null;
          w3B?: number | null;
          wBB?: number | null;
          wHBP?: number | null;
          wHR?: number | null;
          wOBA?: number | null;
          wOBAScale?: number | null;
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
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          leagueId?: string | null;
          name?: string | null;
          ownerId: string;
          season?: string | null;
          sport?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          leagueId?: string | null;
          name?: string | null;
          ownerId?: string;
          season?: string | null;
          sport?: string | null;
        };
      };
      Teams: {
        Row: {
          created_at: string | null;
          espnId: number | null;
          id: number;
          isFavorite: boolean | null;
          leagueId: string | null;
          name: string | null;
          ownerId: string;
        };
        Insert: {
          created_at?: string | null;
          espnId?: number | null;
          id?: number;
          isFavorite?: boolean | null;
          leagueId?: string | null;
          name?: string | null;
          ownerId: string;
        };
        Update: {
          created_at?: string | null;
          espnId?: number | null;
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
