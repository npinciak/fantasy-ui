import { Selector } from '@app/@shared/models/typed-selector';
import { AuthenticationFormState, AuthenticationFormStateModel } from './authentication-form.state';

export class AuthenticationFormSelector {
  @Selector([AuthenticationFormState])
  static getAuthenticationForm(state: AuthenticationFormStateModel) {
    return state;
  }

  @Selector([AuthenticationFormSelector.getAuthenticationForm])
  static getEmail(state: AuthenticationFormStateModel) {
    return state.email;
  }

  @Selector([AuthenticationFormSelector.getAuthenticationForm])
  static getPassword(state: AuthenticationFormStateModel) {
    return state.password;
  }

  @Selector([AuthenticationFormSelector.getEmail, AuthenticationFormSelector.getPassword])
  static getIsFormValid(email: string | null, password: string | null) {
    return email != null && password != null;
  }
}
