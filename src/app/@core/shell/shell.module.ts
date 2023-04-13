import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/@shared/shared.module';
import { MaterialModule } from '@app/material.module';
import { ShellComponent } from './shell.component';

@NgModule({
  imports: [SharedModule, CommonModule, MaterialModule, RouterModule],
  declarations: [ShellComponent],
  exports: [],
})
export class ShellModule {}
