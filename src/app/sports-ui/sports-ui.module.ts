import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared/shared.module';
import { MaterialModule } from '@app/material.module';
import { NgxsModule } from '@ngxs/store';
import { AddLeagueFormComponent } from './components/add-league-form/add-league-form.component';
import { LeaguesTableComponent } from './components/leagues-table/leagues-table.component';
import { LoginComponent } from './components/login/login.component';
import { SportsUiLeagueFormActionHandler } from './handlers/sports-ui-league-form.handler';
import { SportsUiLeaguesActionHandler } from './handlers/sports-ui-leagues.handler';
import { SportsUiTeamsActionHandler } from './handlers/sports-ui-teams.handler';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { SportsUiRoutingModule } from './sports-ui-routing.module';
import { SportsUiLeagueFormState } from './state/sports-ui-league-form.state';
import { SportsUiLeaguesState } from './state/sports-ui-leagues.state';
import { SportsUiTeamsState } from './state/sports-ui-teams.state';
import { SportsUiUserState } from './state/sports-ui-user.state';

@NgModule({
  declarations: [AddLeagueFormComponent, MyProfileComponent, LoginComponent],
  imports: [
    NgxsModule.forFeature([
      SportsUiTeamsState,
      SportsUiTeamsActionHandler,
      SportsUiLeaguesState,
      SportsUiLeaguesActionHandler,
      SportsUiLeagueFormActionHandler,
      SportsUiLeagueFormState,
      SportsUiUserState,
    ]),
    CommonModule,
    SharedModule,
    MaterialModule,
    SportsUiRoutingModule,
    LeaguesTableComponent,
  ],
  exports: [AddLeagueFormComponent],
})
export class SportsUiModule {}
