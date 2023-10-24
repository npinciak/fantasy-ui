import { Injectable } from '@angular/core';
import { SportsUiLeaguesFacade } from '@app/sports-ui/facades/sports-ui-leagues.facade';
import { SportsUiUserFacade } from '@app/sports-ui/facades/sports-ui-user.facade';
import { Action, State, StateContext } from '@ngxs/store';
import { Logout } from '../actions/authentication.actions';
import { AuthenticationService } from '../services/authentication.service';
import { AuthenticationStateModel } from '../state/authentication.state';

@State({ name: 'authenticationActionHandler' })
@Injectable()
export class AuthenticationActionHandler {
  constructor(
    readonly sportsUiLeaguesFacade: SportsUiLeaguesFacade,
    readonly sportsUiUsersFacade: SportsUiUserFacade,
    private authService: AuthenticationService
  ) {}

  @Action(Logout)
  async logout(_: StateContext<AuthenticationStateModel>): Promise<void> {
    try {
      await this.authService.signOut();
    } catch (e) {
      console.error(e);
    }
  }
}
