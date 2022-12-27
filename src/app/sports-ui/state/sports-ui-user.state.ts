import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { AuthenticationService } from '../../@core/authentication/services/authentication.service';

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
  async fetchUser({ patchState }: StateContext<SportsUiUserStateModel>): Promise<void> {
    const res = await this.supaService.get user();

    patchState({ email: res.data.user?.email });
  }
}
