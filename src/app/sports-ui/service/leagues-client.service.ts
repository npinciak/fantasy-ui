import { Injectable } from '@angular/core';
import { SupaClientService } from '@app/@shared/supa/supa-client.service';
import { exists } from '@app/@shared/utilities/utilities.m';
import { Database, SupaClientTables } from '@sports-ui/ui-sdk/supabase';

@Injectable({ providedIn: 'root' })
export class LeaguesClientService extends SupaClientService {
  private table: SupaClientTables = 'Leagues';

  getAll() {
    return this.supabase
      .from(this.table)
      .select<string, Database['public']['Tables']['Leagues']['Row']>('*')
      .eq('expired', false)
      .then(res => (exists(res.data) ? res.data : []));
  }
}
