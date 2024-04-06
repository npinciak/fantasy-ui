import { Database } from './supabase-database.model';

/**
 * Table names as keys
 */
export type SupaClientTables = keyof Database['public']['Tables'];

export type SupaClientTableSchema<T extends SupaClientTables> = Database['public']['Tables'][T];

export type SupaClientTableRelationRow<T extends SupaClientTables> = Database['public']['Tables'][T]['Row'];
export type SupaClientTableRelationInsert<T extends SupaClientTables> = Database['public']['Tables'][T]['Insert'];
export type SupaClientTableRelationUpdate<T extends SupaClientTables> = Database['public']['Tables'][T]['Update'];

export type SupaClientFangraphsConstantsTable = SupaClientTableRelationRow<'fangraphs-constants'>;
export type SupaClientFangraphsConstantsRelationInsert = SupaClientTableRelationInsert<'fangraphs-constants'>;

export type SupaClientLeagues = SupaClientTableRelationRow<'Leagues'>;
export type SupaClientTeams = SupaClientTableRelationRow<'Teams'>;

export type SupaClientLeagueProgression = SupaClientTableRelationRow<'league-progression'>;
export type SupaClientLeagueProgressionInsert = SupaClientTableRelationInsert<'league-progression'>;
