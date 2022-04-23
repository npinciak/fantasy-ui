import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageLayoutComponent } from '@app/@shared/components/page-layout/page-layout.component';
import { SharedModule } from '@app/@shared/shared.module';
import { EspnFastcastModule } from '@app/espn-fastcast/espn-fastcast.module';
import { MaterialModule } from '@app/material.module';
import { ShellComponent } from './shell.component';

@NgModule({
  imports: [EspnFastcastModule, SharedModule, CommonModule, MaterialModule, RouterModule],
  declarations: [ShellComponent, PageLayoutComponent],
  exports: [],
})
export class ShellModule {}
