import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthError, AuthResponse, AuthSession, createClient, SupabaseClient, User, UserResponse } from '@supabase/supabase-js';
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
export class AuthenticationService {
  private supabase: SupabaseClient<Database>;
  private _session: AuthSession | null = null;
  private _user: User | null = null;

  constructor(private snackBar: MatSnackBar) {
    this.supabase = createClient<Database>(environment.supaUrl, environment.supaKey);
  }

  async getSession() {
    await this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });

    return this._session;
  }

  get isLoggedIn(): boolean {
    return this._session != null;
  }

  get user() {
    this.supabase.auth.getUser().then(({ data }) => {
      this._user = data.user;
    });
    return this._user;
  }

  fetchUser() {
    return this.supabase.auth.getUser().then(res => {
      if (res.error) this.authErrorHandler(res.error);
      return res.data;
    });
  }

  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password }).then(res => {
      if (res.error) this.authErrorHandler(res.error);
      return res;
    });
  }

  updateUser(email?: string, password?: string): Promise<UserResponse> {
    return this.supabase.auth.updateUser({ email, password }).then(res => {
      if (res.error) this.authErrorHandler(res.error);
      return res;
    });
  }

  createUser(email: string, password: string): Promise<AuthResponse> {
    return this.supabase.auth.signUp({ email, password }).then(res => {
      if (res.error) this.authErrorHandler(res.error);
      return res;
    });
  }

  private authErrorHandler(res: AuthError | null) {
    this.snackBar.open(`${res!.message}`, 'x', {
      panelClass: ['mat-toolbar', 'mat-warn'],
      duration: 3000,
    });

    throw res;
  }
}
