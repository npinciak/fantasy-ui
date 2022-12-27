import { Injectable } from '@angular/core';
import { AuthenticationService } from '@app/@core/authentication/services/authentication.service';
import { Action, State, StateContext, Store } from '@ngxs/store';

const name = 'sportsUiUser';

export class FetchUser {
  static readonly type = `[${name}] FetchUser`;
}

export interface SportsUiUserStateModel {
  email: string | null;
}

@State<SportsUiUserStateModel>({
  name,
  defaults: {
    email: null,
  },
})
@Injectable()
export class SportsUiUserState {
  constructor(private supaService: AuthenticationService, private store: Store) {}

  @Action(FetchUser)
  fetchUser({ patchState }: StateContext<SportsUiUserStateModel>) {
    const user = this.supaService.user;

    patchState({ email: user?.email });
  }
}
