import { Selector } from '@ngxs/store';
import { SportsUiUserState, SportsUiUserStateModel } from '../state/sports-ui-user.state';

export class SportsUiUserSelectors {
  @Selector([SportsUiUserState])
  static getEmail(state: SportsUiUserStateModel): string | null {
    return state.email;
  }
}
