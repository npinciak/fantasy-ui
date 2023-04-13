import { Injectable } from '@angular/core';
import { SupaClientTable } from '../supa/supa-client-tables.model';
import { SupaClientService } from '../supa/supa-client.service';
import { exists } from '../utilities/exists';

@Injectable({
  providedIn: 'root',
})
export class FangraphsService extends SupaClientService {
  private table: SupaClientTable = 'fangraphs-constants';

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
