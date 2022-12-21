import { Injectable } from '@angular/core';
import { SupaService } from '@app/sports-ui/service/supa.service';
import { Action, State, StateContext, Store } from '@ngxs/store';
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
  constructor(private supaService: SupaService, private store: Store) {}

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
      await this.supaService.signIn(email, password);
    }
  }
}

// email: 'nathan.pinciak@outlook.com',
//       password: 'Ah$7ViRoX53zyU'
