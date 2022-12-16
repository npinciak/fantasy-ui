import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared/shared.module';
import { MaterialModule } from '@app/material.module';
import { NgxsModule } from '@ngxs/store';
import { AddLeagueFormComponent } from './components/add-league-form/add-league-form.component';
import { SportsUiLeagueFormState } from './state/sports-ui-league-form.state';
import { SportsUiLeaguesState } from './state/sports-ui-leagues.state';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';

@NgModule({
  declarations: [AddLeagueFormComponent, MyProfileComponent],
  imports: [CommonModule, SharedModule, MaterialModule, NgxsModule.forFeature([SportsUiLeaguesState, SportsUiLeagueFormState])],
  exports: [AddLeagueFormComponent],
})
export class SportsUiModule {}
