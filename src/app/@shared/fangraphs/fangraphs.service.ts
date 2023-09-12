import { Injectable } from '@angular/core';
import { exists } from '@sports-ui/ui-sdk/helpers';
import { SupaClientTables } from '@sports-ui/ui-sdk/supabase';
import { SupaClientService } from '../supa/supa-client.service';

@Injectable({
  providedIn: 'root',
})
export class FangraphsService extends SupaClientService {
  private table: SupaClientTables = 'fangraphs-constants';

  getFangraphsConstants() {
    return this.supabase
      .from(this.table)
      .select()
      .then(res => (exists(res.data) ? res.data : []));
  }

  getFangraphsConstantsBySeason(season: number) {
    return this.supabase
      .from(this.table)
      .select('*')
      .eq('season', season)
      .then(res => (exists(res.data) ? res.data : []));
  }
}
