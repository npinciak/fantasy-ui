import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { exists } from '@app/@shared/helpers/utils';
import { createClient, PostgrestResponse, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

interface Database {
  public: {
    Tables: {
      Leagues: {
        Row: any[]; // The data expected to be returned from a "select" statement.
        Insert: {}; // The data expected passed to an "insert" statement.
        Update: {}; // The data expected passed to an "update" statement.
      };
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class SupaService {
  private supabase: SupabaseClient<Database>;
  constructor(private snackBar: MatSnackBar) {
    this.supabase = createClient<Database>(environment.supaUrl, environment.supaKey);
  }

  async fetchLeagues() {
    return await this.supabase
      .from('Leagues')
      .select()
      .then(res => {
        if (res.error) {
          this.errorHandler(res);
        }
        return exists(res.data) ? res.data : [];
      });

    //this.fetch('Leagues');
  }

  private async fetch(table) {
    try {
      return await this.supabase
        .from(table)
        .select()
        .then(res => {
          if (res.error) {
            this.errorHandler(res);
          }
          return exists(res.data) ? res.data : [];
        });
    } catch (e) {
      console.log({ e });
    }
  }

  private errorHandler(res: PostgrestResponse<any>) {
    const code = res.status || 0;

    this.snackBar.open(`${code}: ${res.error?.message}`, 'x', {
      panelClass: ['mat-toolbar', 'mat-warn'],
      duration: 3000,
    });

    throw res;
  }
}
