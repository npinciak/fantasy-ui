import { Injectable } from '@angular/core';
import { Selector } from '@app/@shared/models/typed-selector';
import { Action, State, StateContext } from '@ngxs/store';
import { SupabaseClient } from '@supabase/supabase-js';

export interface AuthenticationStateModel {
  token?: string;
}

export class BootUp {
  static readonly type = `[authentication] Bootup`;
}

export class Logout {
  static readonly type = `[authentication] Logout`;
}

@State<AuthenticationStateModel>({
  name: 'authentication',
  defaults: {},
})
@Injectable()
export class AuthenticationState {
  @Selector([AuthenticationState])
  static getToken(state: AuthenticationStateModel): string | undefined {
    return state.token;
  }

  constructor(private supaClient: SupabaseClient) {}

  @Action(BootUp)
  async bootUp({ patchState }: StateContext<AuthenticationStateModel>): Promise<void> {
    // await this.store.dispatch(new SetCurrentUserProfile()).toPromise();
    // const userId = this.store.selectSnapshot(UserProfilesState.getMyProfileUmsUserId);
    // const userEmail = this.store.selectSnapshot(UserProfilesState.getUserProfileById)(userId)?.email ?? '';
    // await this.store.dispatch(new FetchUserIdFeatureFlags({ userId, userEmail })).toPromise();
  }

  //   @Action(LoginFromStorage)
  //   async loginFromStorage(): Promise<void> {
  //     const token = this.authStorageService.getToken();
  //     if (!token) {
  //       return;
  //     }
  //     await this.store.dispatch(new BootUp({ token })).toPromise();
  //   }

  @Action(Logout)
  async logout({ setState }: StateContext<AuthenticationStateModel>): Promise<void> {
    await this.supaClient.auth.signOut();


  }
}
