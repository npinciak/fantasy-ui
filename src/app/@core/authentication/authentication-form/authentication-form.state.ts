import { Injectable } from '@angular/core';
import { SportsUiLeagues } from '@app/sports-ui/actions/sports-ui-leagues.actions';
import { FetchUser } from '@app/sports-ui/state/sports-ui-user.state';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { AuthenticationService } from '../services/authentication.service';
import { AuthenticationForm } from './authentication-form.actions';

export interface AuthenticationFormStateModel {
  email: string | null;
  password: string | null;
}

@State<AuthenticationFormStateModel>({
  name: AuthenticationForm.name,
  defaults: {
    email: null,
    password: null,
  },
})
@Injectable()
export class AuthenticationFormState {
  constructor(private supaService: AuthenticationService, private store: Store) {}

  @Action(AuthenticationForm.SetEmail)
  setEmail({ patchState }: StateContext<AuthenticationFormStateModel>, { payload: { email } }: AuthenticationForm.SetEmail): void {
    patchState({ email });
  }

  @Action(AuthenticationForm.SetPassword)
  setPassword({ patchState }: StateContext<AuthenticationFormStateModel>, { payload: { password } }: AuthenticationForm.SetPassword): void {
    patchState({ password });
  }

  @Action(AuthenticationForm.SignIn)
  async signIn({ getState }: StateContext<AuthenticationFormStateModel>): Promise<void> {
    const { email, password } = getState();

    if (email && password) {
      try {
        const res = await this.supaService.signIn(email, password);

        if (res.error) console.error(res.error);

        this.store.dispatch([new FetchUser()]);
        this.store.dispatch([new SportsUiLeagues.Fetch()]);
      } catch (e) {}
    }

    this.store.dispatch([new AuthenticationForm.Reset()]);
  }

  @Action(AuthenticationForm.Reset)
  reset({ setState }: StateContext<AuthenticationFormStateModel>): void {
    setState({ email: null, password: null });
  }

  @Action(AuthenticationForm.UpdateUser)
  async updateUser(
    _: StateContext<AuthenticationFormStateModel>,
    { payload: { email, password } }: AuthenticationForm.UpdateUser
  ): Promise<void> {
    // await this.supaService.updateUser(email, password);
    // this.store.dispatch([new FetchUser()]);
  }
}
