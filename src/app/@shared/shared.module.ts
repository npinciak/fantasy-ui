import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { PlotlyModule } from 'angular-plotly.js';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import * as PlotlyJS from 'plotly.js-dist-min';
import { DataVisScatterComponent } from './components/data-vis-scatter/data-vis-scatter.component';
import { DataVisComponent } from './components/data-vis/data-vis.component';
import { DropdownFilterComponent } from './components/dropdown-filter/dropdown-filter.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { ScrollableTableComponent } from './components/scrollable-table/scrollable-table.component';
import { StickyTableCellComponent } from './components/sticky-table-cell/sticky-table-cell.component';
import { TableCellSkeletonComponent } from './components/table-cell-skeleton/table-cell-skeleton.component';
import { MlbStatPipe } from './pipes/mlb-stat.pipe';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    NoDataComponent,
    ScrollableTableComponent,
    StickyTableCellComponent,
    DropdownFilterComponent,
    DataVisComponent,
    DataVisScatterComponent,
    TableCellSkeletonComponent,
    MlbStatPipe,
  ],
  imports: [PlotlyModule, RouterModule, MaterialModule, FlexLayoutModule, CommonModule, NgxSkeletonLoaderModule],
  exports: [
    MlbStatPipe,
    DataVisComponent,
    NoDataComponent,
    ScrollableTableComponent,
    StickyTableCellComponent,
    DropdownFilterComponent,
    DataVisScatterComponent,
    TableCellSkeletonComponent,
  ],
})
export class SharedModule {}
