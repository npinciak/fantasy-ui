import { Injectable } from '@angular/core';
import { SportsUiLeaguesFacade } from '@app/sports-ui/facades/sports-ui-leagues.facade';
import { SportsUiUserFacade } from '@app/sports-ui/facades/sports-ui-user.facade';
import { Action, State } from '@ngxs/store';
import { Submit } from '../actions/authentication-form.actions';
import { AuthenticationFormFacade } from '../facade/authentication-form.facade';
import { AuthenticationService } from '../services/authentication.service';

@State({ name: 'authenticationFormActionHandler' })
@Injectable()
export class AuthenticationFormActionHandler {
  constructor(
    private authenticationFormFacade: AuthenticationFormFacade,
    private sportsUiUserFacade: SportsUiUserFacade,
    private sportsUiLeaguesFacade: SportsUiLeaguesFacade,
    private authenticationService: AuthenticationService
  ) {}

  @Action(Submit)
  async signIn(): Promise<void> {
    const email = this.authenticationFormFacade.email;
    const password = this.authenticationFormFacade.password;

    if (email && password) {
      try {
        const res = await this.authenticationService.signIn(email, password);

        if (res.error) console.error(res.error);

        this.sportsUiUserFacade.fetchUser();

        this.sportsUiLeaguesFacade.fetchLeagues();
      } catch (e) {}
    }

    this.authenticationFormFacade.reset();
  }
}
