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
import { RefreshBtnComponent } from './components/refresh-btn/refresh-btn.component';
import { ScrollableTableComponent } from './components/scrollable-table/scrollable-table.component';
import { StickyTableCellComponent } from './components/sticky-table-cell/sticky-table-cell.component';
import { LoadingSkeletonComponent } from './components/loading-skeleton/loading-skeleton.component';
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
    LoadingSkeletonComponent,
    StatPipe,
    RefreshBtnComponent,
  ],
  imports: [PlotlyModule, RouterModule, MaterialModule, CommonModule],
  exports: [
    StatPipe,
    DataVisComponent,
    NoDataComponent,
    ScrollableTableComponent,
    StickyTableCellComponent,
    DropdownFilterComponent,
    DataVisScatterComponent,
    LoadingSkeletonComponent,
    PageLayoutComponent,
    RefreshBtnComponent,
  ],
})
export class SharedModule {}
