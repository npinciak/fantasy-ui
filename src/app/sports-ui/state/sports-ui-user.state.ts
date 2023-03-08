import { Injectable } from '@angular/core';
import { AuthenticationService } from '@app/@core/authentication/services/authentication.service';
import { Action, State, StateContext } from '@ngxs/store';

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
  constructor(private supaService: AuthenticationService) {}

  @Action(FetchUser)
  async fetchUser({ patchState }: StateContext<SportsUiUserStateModel>) {
    const { user } = await this.supaService.fetchUser();
    if (!user) return;
    patchState({ email: user.email });
  }
}
