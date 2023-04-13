import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Database } from './supabase-client.model';

@Injectable({
  providedIn: 'root',
})
export class SupaClientService {
  protected supabase: SupabaseClient<Database>;

  constructor() {
    this.supabase = createClient<Database>(environment.supaUrl, environment.supaKey);
  }
}
