import { createPropertySelectors } from '@ngxs/store';
import { AuthenticationState, AuthenticationStateModel } from '../state/authentication.state';

export class AuthenticationSelectors {
  static slices = createPropertySelectors<AuthenticationStateModel>(AuthenticationState);
}
