import { Injectable } from '@angular/core';
import { statusCodeToMessage } from '@app/@shared/models/http-errors.model';
import { SnackBarService } from '@app/@shared/services/snackbar.service';
import { SupaClientService } from '@app/@shared/supa/supa-client.service';
import { AuthError, AuthResponse, AuthSession, User, UserResponse } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends SupaClientService {
  private _session: AuthSession | null = null;
  private _user: User | null = null;

  constructor(private snackBarService: SnackBarService) {
    super();
  }

  async getSession(): Promise<AuthSession | null> {
    await this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });

    return this._session;
  }

  get isLoggedIn(): boolean {
    return this._session != null;
  }

  get user(): User | null {
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

  signOut(): Promise<{ error: AuthError | null }> {
    return this.supabase.auth.signOut().then(res => {
      if (res.error) this.authErrorHandler(res.error);
      return res;
    });
  }

  updateUser(email: string, password: string): Promise<UserResponse> {
    return this.supabase.auth.updateUser({ email, password }).then(res => {
      if (res.error) this.authErrorHandler(res.error);
      if (res) this.snackBarService.showSuccessSnackBar(`User updated successfully`);

      return res;
    });
  }

  createUser(email: string, password: string): Promise<AuthResponse> {
    return this.supabase.auth.signUp({ email, password }).then(res => {
      if (res.error) this.authErrorHandler(res.error);
      if (res) this.snackBarService.showSuccessSnackBar(`User created successfully`);

      return res;
    });
  }

  private authErrorHandler(res: AuthError | null) {
    this.snackBarService.showErrorSnackBar(`${statusCodeToMessage[401]}`);
    console.error(res?.message);
  }
}
