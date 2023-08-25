import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Reset, SetEmail, SetPassword, Submit } from '../actions/authentication-form.actions';
import { AuthenticationFormSelector } from '../selectors/authentication-form.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationFormFacade {
  email$ = select(AuthenticationFormSelector.slices.email);
  password$ = select(AuthenticationFormSelector.slices.password);
  isFormValid$ = select(AuthenticationFormSelector.getIsFormValid);

  constructor(private store: Store) {}

  get email() {
    return this.store.selectSnapshot(AuthenticationFormSelector.slices.email);
  }

  get password() {
    return this.store.selectSnapshot(AuthenticationFormSelector.slices.password);
  }

  setEmail(email: string | null) {
    return this.store.dispatch(new SetEmail({ email }));
  }

  setPassword(password: string | null) {
    return this.store.dispatch(new SetPassword({ password }));
  }

  signIn() {
    return this.store.dispatch(new Submit());
  }

  reset() {
    return this.store.dispatch(new Reset());
  }
}
