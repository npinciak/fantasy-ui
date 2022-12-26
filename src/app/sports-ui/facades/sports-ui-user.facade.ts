import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { SportsUiUserSelectors } from '../selectors/sports-ui-user.selectors';
import { FetchUser } from '../state/sports-ui-user.state';

@Injectable({
  providedIn: 'root',
})
export class SportsUiUserFacade {
  userEmail$ = select(SportsUiUserSelectors.getEmail);

  constructor(private store: Store) {}

  fetchUser() {
    return this.store.dispatch([new FetchUser()]);
  }
}
