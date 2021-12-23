import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDataComponent } from './components/no-data/no-data.component';
import { MaterialModule } from '@app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { DialogComponent } from './components/dialog/dialog.component';
import { ScrollableTableComponent } from './components/scrollable-table/scrollable-table.component';
import { StickyTableCellComponent } from './components/sticky-table-cell/sticky-table-cell.component';
import { DropdownFilterComponent } from './components/dropdown-filter/dropdown-filter.component';

@NgModule({
  declarations: [NoDataComponent, DialogComponent, ScrollableTableComponent, StickyTableCellComponent, DropdownFilterComponent],
  imports: [RouterModule, MaterialModule, FlexLayoutModule, CommonModule],
  exports: [NoDataComponent, DialogComponent, ScrollableTableComponent, StickyTableCellComponent, DropdownFilterComponent],
})
export class SharedModule {}
