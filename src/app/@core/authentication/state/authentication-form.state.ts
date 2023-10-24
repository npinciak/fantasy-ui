import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Reset, SetEmail, SetPassword, UpdateUser } from '../actions/authentication-form.actions';
import { AuthenticationFormStateModel, INITIAL_STATE } from '../authentication-form/authentication-form.model';

@State<AuthenticationFormStateModel>({
  name: 'authenticationForm',
  defaults: INITIAL_STATE,
})
@Injectable()
export class AuthenticationFormState {
  @Action(SetEmail)
  setEmail({ patchState }: StateContext<AuthenticationFormStateModel>, { payload: { email } }: SetEmail): void {
    patchState({ email });
  }

  @Action(SetPassword)
  setPassword({ patchState }: StateContext<AuthenticationFormStateModel>, { payload: { password } }: SetPassword): void {
    patchState({ password });
  }

  @Action(Reset)
  reset({ setState }: StateContext<AuthenticationFormStateModel>): void {
    setState({ email: null, password: null });
  }

  @Action(UpdateUser)
  async updateUser(_: StateContext<AuthenticationFormStateModel>, { payload: { email, password } }: UpdateUser): Promise<void> {
    // await firstValueFrom(this.supaService.updateUser(email, password);
    // this.store.dispatch([new FetchUser()]);
  }
}
