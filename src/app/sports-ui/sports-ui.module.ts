import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule, GridModule } from '@angular/flex-layout';
import { SharedModule } from '@app/@shared/shared.module';
import { MaterialModule } from '@app/material.module';
import { NgxsModule } from '@ngxs/store';
import { AddLeagueFormComponent } from './components/add-league-form/add-league-form.component';
import { SportsUiLeagueFormState } from './state/sports-ui-league-form.state';
import { SportsUiLeaguesState } from './state/sports-ui-leagues.state';

@NgModule({
  declarations: [AddLeagueFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    GridModule,
    NgxsModule.forFeature([SportsUiLeaguesState, SportsUiLeagueFormState]),
  ],
  exports: [AddLeagueFormComponent],
})
export class SportsUiModule {}
