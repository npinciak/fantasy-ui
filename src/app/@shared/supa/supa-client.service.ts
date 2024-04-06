import { Injectable } from '@angular/core';
import { Database, SupaClientTableRelationRow, SupaClientTables } from '@sports-ui/ui-sdk/supabase';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

export const supabase = createClient<Database>(environment.supaUrl, environment.supaKey);

export function SupabaseClientService<Table extends SupaClientTables>({ table }: { table: SupaClientTables }) {
  @Injectable({
    providedIn: 'root',
  })
  class SupabaseClientClass {
    static table = table;

    static supabase = supabase;

    static async getById(id: string): Promise<SupaClientTableRelationRow<Table>> {
      const { data, error } = await supabase.from(table).select().eq('id', id).single();
      if (error) throw error;
      return data;
    }

    static async getAll(): Promise<SupaClientTableRelationRow<Table>[]> {
      const { data, error } = await supabase.from(table).select();
      if (error) throw error;
      return data;
    }

    static async insert(payload: SupaClientTableRelationRow<Table>): Promise<null> {
      const { data, error } = await supabase.from(table).insert(payload);
      if (error) throw error;
      return data;
    }

    static async update(id: string, payload: Partial<SupaClientTableRelationRow<Table>>): Promise<null> {
      const { data, error } = await supabase.from(table).update(payload).eq('id', id);
      if (error) throw error;
      return data;
    }

    static async delete(id: string): Promise<null> {
      const { data, error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      return data;
    }
  }

  return SupabaseClientClass;
}

