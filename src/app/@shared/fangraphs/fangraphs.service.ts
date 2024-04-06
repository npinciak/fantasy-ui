import { Injectable } from '@angular/core';
import { SupabaseClientService } from '../supa/supa-client.service';

@Injectable({ providedIn: 'root' })
export class FangraphsService extends SupabaseClientService<'fangraphs-constants'>({ table: 'fangraphs-constants' }){
  // getFangraphsConstants() {
  //   return this.supabase
  //     .from(this.table)
  //     .select()
  //     .then(res => (exists(res.data) ? res.data : []));
  // }

  // getFangraphsConstantsBySeason(season: number) {
  //   return this.supabase
  //     .from(this.table)
  //     .select('*')
  //     .eq('season', season)
  //     .then(res => (exists(res.data) ? res.data : []));
  // }
}
  