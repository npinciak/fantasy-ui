import { Injectable } from '@angular/core';
import { SupaClientService } from '@app/@shared/supa/supa-client.service';
import { exists } from '@app/@shared/utilities/utilities.m';
import { Database, SupaClientTables } from '@sports-ui/ui-sdk';

@Injectable({ providedIn: 'root' })
export class TeamsClientService extends SupaClientService {
  private table: SupaClientTables = 'Teams';

  getAll() {
    return this.supabase
      .from(this.table)
      .select<string, Database['public']['Tables']['Teams']['Row']>('*')
      .then(res => (exists(res.data) ? res.data : []));
  }
}
