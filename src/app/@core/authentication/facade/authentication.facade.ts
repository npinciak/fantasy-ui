import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Logout } from '../actions/authentication.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationFacade {
  constructor(private store: Store) {}

  logout() {
    this.store.dispatch([new Logout()]);
  }
}
