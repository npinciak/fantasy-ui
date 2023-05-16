import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { SportsBookLeagueSpreadActionHandler } from './handlers/league.handlers';
import { SportsBookLeagueStatsState } from './state/league-spread.state';

@NgModule({
  declarations: [],
  imports: [NgxsModule.forFeature([SportsBookLeagueSpreadActionHandler, SportsBookLeagueStatsState]), CommonModule, SharedModule],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SportsBookModule {}
