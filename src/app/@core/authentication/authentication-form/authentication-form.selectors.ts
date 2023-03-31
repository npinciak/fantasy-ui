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

  @Selector([AuthenticationFormSelector.getEmail])
  static isEmailValid(email: string | null): boolean {
    return email != null && email != '';
  }

  @Selector([AuthenticationFormSelector.getAuthenticationForm])
  static getPassword(state: AuthenticationFormStateModel): string | null {
    return state.password;
  }

  @Selector([AuthenticationFormSelector.getPassword])
  static isPasswordValid(password: string | null): boolean {
    return password != null && password != '';
  }

  @Selector([AuthenticationFormSelector.isEmailValid, AuthenticationFormSelector.isPasswordValid])
  static getIsFormValid(isEmailValid: boolean, isPasswordValid: boolean): boolean {
    return isEmailValid && isPasswordValid;
  }
}
