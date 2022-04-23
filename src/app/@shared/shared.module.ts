import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { DataVisComponent } from './components/data-vis/data-vis.component';
import { DropdownFilterComponent } from './components/dropdown-filter/dropdown-filter.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { ScrollableTableComponent } from './components/scrollable-table/scrollable-table.component';
import { StickyTableCellComponent } from './components/sticky-table-cell/sticky-table-cell.component';
import { MlbStatPipe } from './pipes/mlb-stat.pipe';

@NgModule({
  declarations: [
    NoDataComponent,
    ScrollableTableComponent,
    StickyTableCellComponent,
    DropdownFilterComponent,
    DataVisComponent,
    MlbStatPipe,
  ],
  imports: [RouterModule, MaterialModule, FlexLayoutModule, CommonModule],
  exports: [MlbStatPipe, DataVisComponent, NoDataComponent, ScrollableTableComponent, StickyTableCellComponent, DropdownFilterComponent],
})
export class SharedModule {}
