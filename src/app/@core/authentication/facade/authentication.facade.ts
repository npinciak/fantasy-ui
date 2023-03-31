import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Logout } from '../state/authentication.state';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationFacade {
  constructor(private store: Store) {}

  logout() {
    this.store.dispatch([new Logout()]);
  }
}
