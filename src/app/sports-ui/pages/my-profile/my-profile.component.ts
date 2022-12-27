import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationFormFacade } from '@app/@core/authentication/authentication-form/authentication-form.facade';
import { RouterFacade } from '@app/@core/store/router/router.facade';
import { SportToUrlFragmentSportMap } from '@app/@core/store/router/url-builder';
import { LayoutService } from '@app/@shared/services/layout.service';
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
  isMobile$ = this.layoutService.isMobile$;
  allLeagues$ = this.sportsUiLeaguesFacade.allLeagues$;
  isFormValid$ = this.authenticationFormFacade.isFormValid$;

  readonly LEAGUE_ROWS = USER_LEAGUE_ROWS;
  readonly LEAGUE_HEADERS = USER_LEAGUE_HEADERS;

  constructor(
    private layoutService: LayoutService,
    private routerFacade: RouterFacade,
    private sportsUiUserFacade: SportsUiUserFacade,
    private sportsUiLeaguesFacade: SportsUiLeaguesFacade,
    private authenticationFormFacade: AuthenticationFormFacade,
    private dialog: MatDialog
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
    this.routerFacade.navigateToLeagueHome(SportToUrlFragmentSportMap[val.sport], val.leagueId);
  }

  onAddLeague(): void {
    this.dialog.open(AddLeagueFormComponent, { height: '500px', width: '800px' });
  }

  onRemoveLeague(leagueId: string): void {
    // this.sportsUiLeaguesFacade.deleteLeague(leagueId);
  }
}
