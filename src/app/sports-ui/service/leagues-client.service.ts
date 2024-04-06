import { Injectable } from '@angular/core';
import { SupabaseClientService } from '@app/@shared/supa/supa-client.service';

// @Injectable({ providedIn: 'root' })
// export class LeaguesClientService extends SupaClientService {
//   private table: SupaClientTables = 'Leagues';

//   create(league: Pick<Database['public']['Tables']['Leagues']['Row'], 'leagueId' | 'name' | 'sport' | 'season'>) {
//     return this.supabase.from(this.table).insert(league);
//   }

//   getAll() {
//     return this.supabase
//       .from(this.table)
//       .select<string, Database['public']['Tables']['Leagues']['Row']>('*')
//       .eq('expired', false)
//       .then(res => (exists(res.data) ? res.data : []));
//   }
// }
@Injectable({ providedIn: 'root' })
export class LeaguesClientService extends SupabaseClientService<'league'>({ table: 'league' }){}
