import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';
import { BaseChartDirective } from './base-chart.directive';
import { DataVisScatterComponent } from './components/data-vis-scatter/data-vis-scatter.component';
import { DropdownFilterComponent } from './components/dropdown-filter/dropdown-filter.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { LoadingSkeletonComponent } from './components/loading-skeleton/loading-skeleton.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { RefreshBtnComponent } from './components/refresh-btn/refresh-btn.component';
import { StickyTableCellComponent } from './components/sticky-table-cell/sticky-table-cell.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { StatPipe } from './pipes/stat-format.pipe';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    BaseChartDirective,
    NoDataComponent,
    PageLayoutComponent,
    StickyTableCellComponent,
    DropdownFilterComponent,
    LineChartComponent,
    DataVisScatterComponent,
    LoadingSkeletonComponent,
    StatPipe,
    RefreshBtnComponent,
    ToggleComponent,
  ],
  imports: [PlotlyModule, RouterModule, MaterialModule, CommonModule],
  exports: [
    StatPipe,
    LineChartComponent,
    NoDataComponent,
    StickyTableCellComponent,
    DropdownFilterComponent,
    DataVisScatterComponent,
    LoadingSkeletonComponent,
    PageLayoutComponent,
    RefreshBtnComponent,
    ToggleComponent,
  ],
})
export class SharedModule {}
