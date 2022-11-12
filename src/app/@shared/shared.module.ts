import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { PlotlyModule } from 'angular-plotly.js';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import * as PlotlyJS from 'plotly.js-dist-min';
import { DataVisScatterComponent } from './components/data-vis-scatter/data-vis-scatter.component';
import { DataVisComponent } from './components/data-vis/data-vis.component';
import { DropdownFilterComponent } from './components/dropdown-filter/dropdown-filter.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { ScrollableTableComponent } from './components/scrollable-table/scrollable-table.component';
import { StickyTableCellComponent } from './components/sticky-table-cell/sticky-table-cell.component';
import { TableCellSkeletonComponent } from './components/table-cell-skeleton/table-cell-skeleton.component';
import { StatPipe } from './pipes/stat-format.pipe';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    NoDataComponent,
    PageLayoutComponent,
    ScrollableTableComponent,
    StickyTableCellComponent,
    DropdownFilterComponent,
    DataVisComponent,
    DataVisScatterComponent,
    TableCellSkeletonComponent,
    StatPipe,
  ],
  imports: [PlotlyModule, RouterModule, MaterialModule, CommonModule, NgxSkeletonLoaderModule],
  exports: [
    StatPipe,
    DataVisComponent,
    NoDataComponent,
    ScrollableTableComponent,
    StickyTableCellComponent,
    DropdownFilterComponent,
    DataVisScatterComponent,
    TableCellSkeletonComponent,
    PageLayoutComponent,
  ],
})
export class SharedModule {}
