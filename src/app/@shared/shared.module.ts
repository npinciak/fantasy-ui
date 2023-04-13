import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { BaseChartDirective } from './chart.directive';
import { BaseCardComponent } from './components/base-card/base-card.component';
import { BaseChartComponent } from './components/base-chart/base-chart.component';
import { ChartBarComponent } from './components/chart-bar/chart-bar.component';
import { ChartLineComponent } from './components/chart-line/chart-line.component';
import { ChartPieComponent } from './components/chart-pie/chart-pie.component';
import { DataVisScatterComponent } from './components/data-vis-scatter/data-vis-scatter.component';
import { DropdownFilterComponent } from './components/dropdown-filter/dropdown-filter.component';
import { LoadingSkeletonComponent } from './components/loading-skeleton/loading-skeleton.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { RefreshBtnComponent } from './components/refresh-btn/refresh-btn.component';
import { ShellNavComponent } from './components/shell-nav/shell-nav.component';
import { StickyTableCellComponent } from './components/sticky-table-cell/sticky-table-cell.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { StatPipe } from './pipes/stat-format.pipe';

@NgModule({
  declarations: [
    BaseChartDirective,
    NoDataComponent,
    PageLayoutComponent,
    StickyTableCellComponent,
    DropdownFilterComponent,
    ChartBarComponent,
    ChartLineComponent,
    ChartPieComponent,
    DataVisScatterComponent,
    LoadingSkeletonComponent,
    StatPipe,
    RefreshBtnComponent,
    ToggleComponent,
    ShellNavComponent,
    BaseCardComponent,
    BaseChartComponent,
  ],
  imports: [RouterModule, MaterialModule, CommonModule],
  exports: [
    StatPipe,
    BaseChartDirective,
    ChartLineComponent,
    ChartPieComponent,
    ChartBarComponent,
    NoDataComponent,
    StickyTableCellComponent,
    DropdownFilterComponent,
    DataVisScatterComponent,
    LoadingSkeletonComponent,
    PageLayoutComponent,
    RefreshBtnComponent,
    ToggleComponent,
    ShellNavComponent,
    BaseCardComponent,
    BaseChartComponent,
  ],
})
export class SharedModule {}
