import { Selector } from '@app/@shared/models/typed-selector';
import { AuthenticationFormState, AuthenticationFormStateModel } from './authentication-form.state';

export class AuthenticationFormSelector {
  @Selector([AuthenticationFormState])
  static getAuthenticationForm(state: AuthenticationFormStateModel): AuthenticationFormStateModel {
    return state;
  }

  @Selector([AuthenticationFormSelector.getAuthenticationForm])
  static getEmail(state: AuthenticationFormStateModel): string | null {
    return state.email;
  }

  @Selector([AuthenticationFormSelector.getAuthenticationForm])
  static getPassword(state: AuthenticationFormStateModel): string | null {
    return state.password;
  }

  @Selector([AuthenticationFormSelector.getEmail, AuthenticationFormSelector.getPassword])
  static getIsFormValid(email: string | null, password: string | null): boolean {
    return !email || !password;
  }
}
