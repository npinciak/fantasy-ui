import { Selector } from '@app/@shared/models/typed-selector';
import { createPropertySelectors } from '@ngxs/store';
import { AuthenticationFormStateModel } from '../authentication-form/authentication-form.model';
import { AuthenticationFormState } from '../state/authentication-form.state';

export class AuthenticationFormSelector {
  static slices = createPropertySelectors<AuthenticationFormStateModel>(AuthenticationFormState);

  @Selector([AuthenticationFormSelector.slices.email])
  static isEmailValid(email: string | null): boolean {
    return email != null && email != '';
  }

  @Selector([AuthenticationFormSelector.slices.password])
  static isPasswordValid(password: string | null): boolean {
    return password != null && password != '';
  }

  @Selector([AuthenticationFormSelector.isEmailValid, AuthenticationFormSelector.isPasswordValid])
  static getIsFormValid(isEmailValid: boolean, isPasswordValid: boolean): boolean {
    return isEmailValid && isPasswordValid;
  }
}
