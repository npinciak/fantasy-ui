import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared/shared.module';
import { EspnModule } from '@app/espn/espn.module';
import { MaterialModule } from '@app/material.module';
import { NgxsModule } from '@ngxs/store';
import { EspnFantasyBaseballRoutingModule } from './espn-fantasy-baseball-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, MaterialModule, EspnModule, EspnFantasyBaseballRoutingModule, NgxsModule.forFeature([])],
  exports: [],
})
export class EspnFantasyBaseballModule {}
