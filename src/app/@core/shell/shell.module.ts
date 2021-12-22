import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/@shared/shared.module';
import { ShellComponent } from './shell.component';
import { PageLayoutComponent } from '@app/@shared/components/page-layout/page-layout.component';

@NgModule({
  imports: [SharedModule, CommonModule, MaterialModule, RouterModule],
  declarations: [ShellComponent, PageLayoutComponent],
})
export class ShellModule {}
