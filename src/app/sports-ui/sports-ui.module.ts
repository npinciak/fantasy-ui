import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AddLeagueFormComponent } from './components/add-league-form/add-league-form.component';
import { SportsUiLeagueFormState } from './state/sports-ui-league-form.state';
import { SportsUiLeaguesState } from './state/sports-ui-leagues.state';

@NgModule({
  declarations: [AddLeagueFormComponent],
  imports: [CommonModule, NgxsModule.forFeature([SportsUiLeaguesState, SportsUiLeagueFormState])],
  exports: [AddLeagueFormComponent],
})
export class SportsUiModule {}
