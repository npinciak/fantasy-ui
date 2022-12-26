import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { AuthenticationForm } from './authentication-form.actions';
import { AuthenticationFormSelector } from './authentication-form.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationFormFacade {
  email$ = select(AuthenticationFormSelector.getEmail);
  password$ = select(AuthenticationFormSelector.getPassword);
  isFormValid$ = select(AuthenticationFormSelector.getIsFormValid);

  constructor(private store: Store) {}

  setEmail(email: string | null) {
    return this.store.dispatch(new AuthenticationForm.SetEmail({ email }));
  }

  setPassword(password: string | null) {
    return this.store.dispatch(new AuthenticationForm.SetPassword({ password }));
  }

  signIn() {
    return this.store.dispatch(new AuthenticationForm.SignIn());
  }
}
