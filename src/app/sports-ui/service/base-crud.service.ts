import { MatSnackBar } from '@angular/material/snack-bar';
import { exists } from '@app/@shared/utilities/utilities.m';
import { AuthError, createClient, PostgrestResponse, SupabaseClient } from '@supabase/supabase-js';
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

export function BaseCrudService<T>({ table }: { table: string }) {
  class CrudServiceClass {
    private supabase: SupabaseClient<Database>;

    constructor(private snackBar: MatSnackBar) {
      this.supabase = createClient<Database>(environment.supaUrl, environment.supaKey);
    }

    getAll() {
      return this.table.select<string, T>().then(res => {
        if (res.error) this.errorHandler(res);
        return exists(res.data) ? res.data : [];
      });
    }

    getById(id: string) {
      return this.table
        .select<string, T>()
        .eq('id', id)
        .then(res => {
          if (res.error) this.errorHandler(res);
          return exists(res.data) ? res.data : [];
        });
    }

    create(model) {
      return this.table.insert<T extends { Insert: unknown } ? T['Insert'] : never>(model).then(res => {
        if (res.error) this.errorHandler(res);
        return exists(res.data) ? res.data : [];
      });
    }

    update(id: string, model) {
      return this.table
        .update<T extends { Update: unknown } ? T['Update'] : never>(model)
        .eq('id', id)
        .then(res => res);
    }

    delete(id: string) {
      return this.table
        .delete()
        .eq('id', id)
        .then(res => {
          if (res.error) this.errorHandler(res);
          return exists(res.data) ? res.data : [];
        });
    }

    private get table() {
      return this.supabase.from<string, T>(table);
    }

    private errorHandler(res: PostgrestResponse<any>) {
      const code = res.status || 0;

      this.snackBar.open(`${code}: ${res.error?.message}`, 'x', {
        panelClass: ['mat-toolbar', 'mat-warn'],
        duration: 3000,
      });

      throw res;
    }

    private authErrorHandler(res: AuthError | null) {
      this.snackBar.open(`${res!.message}`, 'x', {
        panelClass: ['mat-toolbar', 'mat-warn'],
        duration: 3000,
      });

      throw res;
    }
  }

  return CrudServiceClass;
}
