import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationFormFacade } from '@app/@core/authentication/authentication-form/authentication-form.facade';
import { AuthenticationService } from '@app/@core/authentication/services/authentication.service';
import { RouterFacade } from '@app/@core/store/router/router.facade';
import { AddLeagueFormComponent } from '@app/sports-ui/components/add-league-form/add-league-form.component';
import { USER_LEAGUE_HEADERS, USER_LEAGUE_ROWS } from '@app/sports-ui/components/leagues-table/leagues-table.const';
import { SportsUiLeaguesFacade } from '@app/sports-ui/facades/sports-ui-leagues.facade';
import { SportsUiUserFacade } from '@app/sports-ui/facades/sports-ui-user.facade';
import { SportsUiClientLeague } from '@app/sports-ui/models/sports-ui-league.model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  userEmail$ = this.sportsUiUserFacade.userEmail$;

  allLeagues$ = this.sportsUiLeaguesFacade.allLeagues$;
  isFormValid$ = this.authenticationFormFacade.isFormValid$;

  readonly LEAGUE_ROWS = USER_LEAGUE_ROWS;
  readonly LEAGUE_HEADERS = USER_LEAGUE_HEADERS;

  constructor(
    private routerFacade: RouterFacade,
    private sportsUiUserFacade: SportsUiUserFacade,
    private sportsUiLeaguesFacade: SportsUiLeaguesFacade,
    private authenticationFormFacade: AuthenticationFormFacade,
    private dialog: MatDialog,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  passwordInputChange(val: string) {
    this.authenticationFormFacade.setPassword(val);
  }

  emailInputChange(val: string) {
    this.authenticationFormFacade.setEmail(val);
  }

  onSignIn() {
    this.authenticationFormFacade.signIn();
  }

  onNavigateToLeague(val: SportsUiClientLeague) {
    this.routerFacade.navigateToFantasyLeagueHome(val.sport, val.season, val.leagueId);
  }

  onAddLeague(): void {
    this.dialog.open(AddLeagueFormComponent, { height: '500px', width: '800px' });
  }

  onRemoveLeague(leagueId: number): void {
    // this.sportsUiLeaguesFacade.deleteLeague(leagueId);
  }
}
