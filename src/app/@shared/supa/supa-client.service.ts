import { Injectable } from '@angular/core';
import { Database } from '@sports-ui/ui-sdk/supabase';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupaClientService {
  protected supabase: SupabaseClient<Database>;

  constructor() {
    this.supabase = createClient<Database>(environment.supaUrl, environment.supaKey);
  }
}
