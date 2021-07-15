import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDataComponent } from './components/no-data/no-data.component';
import { MaterialModule } from '@app/material.module';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [NoDataComponent, PageLayoutComponent],
  imports: [MaterialModule, FlexLayoutModule, CommonModule],
  exports: [NoDataComponent, PageLayoutComponent],
})
export class SharedModule {}
