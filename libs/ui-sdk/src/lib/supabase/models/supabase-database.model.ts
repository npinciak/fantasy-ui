export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      "fangraphs-constants": {
        Row: {
          cFIP: number
          id: number
          "R/PA": number
          "R/W": number
          runCS: number
          runSB: number
          season: number
          w1B: number
          w2B: number
          w3B: number
          wBB: number
          wHBP: number
          wHR: number
          wOBA: number
          wOBAScale: number
        }
        Insert: {
          cFIP: number
          id?: number
          "R/PA": number
          "R/W": number
          runCS: number
          runSB: number
          season: number
          w1B: number
          w2B: number
          w3B: number
          wBB: number
          wHBP: number
          wHR: number
          wOBA: number
          wOBAScale: number
        }
        Update: {
          cFIP?: number
          id?: number
          "R/PA"?: number
          "R/W"?: number
          runCS?: number
          runSB?: number
          season?: number
          w1B?: number
          w2B?: number
          w3B?: number
          wBB?: number
          wHBP?: number
          wHR?: number
          wOBA?: number
          wOBAScale?: number
        }
        Relationships: []
      }
      league: {
        Row: {
          created_at: string
          id: number
          league_id: string
          name: string | null
          season: number
          sport: Database["public"]["Enums"]["Fantasy League Sport"]
        }
        Insert: {
          created_at?: string
          id?: number
          league_id: string
          name?: string | null
          season: number
          sport?: Database["public"]["Enums"]["Fantasy League Sport"]
        }
        Update: {
          created_at?: string
          id?: number
          league_id?: string
          name?: string | null
          season?: number
          sport?: Database["public"]["Enums"]["Fantasy League Sport"]
        }
        Relationships: []
      }
      "league-owner": {
        Row: {
          created_at: string
          id: number
          league_id: string
          owner_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          league_id: string
          owner_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          league_id?: string
          owner_id?: string
        }
        Relationships: []
      }
      "league-progression": {
        Row: {
          created_at: string
          date: string | null
          espn_team_id: number | null
          id: number
          league_id: string
          rank: number | null
          total_points: number | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          espn_team_id?: number | null
          id?: number
          league_id: string
          rank?: number | null
          total_points?: number | null
        }
        Update: {
          created_at?: string
          date?: string | null
          espn_team_id?: number | null
          id?: number
          league_id?: string
          rank?: number | null
          total_points?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_league-progression_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "league"
            referencedColumns: ["league_id"]
          },
        ]
      }
      Leagues: {
        Row: {
          created_at: string | null
          expired: boolean
          id: number
          leagueId: string | null
          name: string | null
          ownerId: string
          season: string | null
          sport: string | null
        }
        Insert: {
          created_at?: string | null
          expired?: boolean
          id?: number
          leagueId?: string | null
          name?: string | null
          ownerId: string
          season?: string | null
          sport?: string | null
        }
        Update: {
          created_at?: string | null
          expired?: boolean
          id?: number
          leagueId?: string | null
          name?: string | null
          ownerId?: string
          season?: string | null
          sport?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Leagues_ownerId_fkey"
            columns: ["ownerId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      team: {
        Row: {
          created_at: string
          id: number
          name: string | null
          team_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          team_id: number
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          team_id?: number
        }
        Relationships: []
      }
      "team-owner": {
        Row: {
          created_at: string
          id: number
          owner_id: string | null
          team_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          owner_id?: string | null
          team_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          owner_id?: string | null
          team_id?: number | null
        }
        Relationships: []
      }
      Teams: {
        Row: {
          created_at: string | null
          espnId: string | null
          id: number
          isFavorite: boolean | null
          leagueId: string | null
          name: string | null
          ownerId: string
        }
        Insert: {
          created_at?: string | null
          espnId?: string | null
          id?: number
          isFavorite?: boolean | null
          leagueId?: string | null
          name?: string | null
          ownerId: string
        }
        Update: {
          created_at?: string | null
          espnId?: string | null
          id?: number
          isFavorite?: boolean | null
          leagueId?: string | null
          name?: string | null
          ownerId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Teams_ownerId_fkey"
            columns: ["ownerId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      "Fantasy League Sport": "baseball" | "football"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
