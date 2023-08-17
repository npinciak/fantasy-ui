import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared/shared.module';
import { MaterialModule } from '@app/material.module';
import { SystemStatusRoutingModule } from './system-status-routing.module';
import { SystemStatusComponent } from './system-status.component';

@NgModule({
  declarations: [SystemStatusComponent],
  imports: [CommonModule, SharedModule, MaterialModule, SystemStatusRoutingModule],
})
export class SystemStatusModule {}
