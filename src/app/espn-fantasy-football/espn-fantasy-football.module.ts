import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared/shared.module';
import { MaterialModule } from '@app/material.module';
import { NgxsModule } from '@ngxs/store';
import { EspnFantasyFootballModuleRoutingModule } from './espn-fantasy-football-routing.module';

@NgModule({
  declarations: [],
  imports: [NgxsModule.forFeature([]), CommonModule, SharedModule, MaterialModule, EspnFantasyFootballModuleRoutingModule],
  exports: [],
})
export class EspnFantasyFootballModule {}
