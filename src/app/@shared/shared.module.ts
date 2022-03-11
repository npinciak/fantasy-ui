import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { ChartsModule } from 'ng2-charts';
import { DataVisComponent } from './components/data-vis/data-vis.component';
import { DropdownFilterComponent } from './components/dropdown-filter/dropdown-filter.component';
import { EspnScoreboardCardTeamComponent } from './components/espn-scoreboard-card-team/espn-scoreboard-card-team.component';
import { EspnScoreboardCardComponent } from './components/espn-scoreboard-card/espn-scoreboard-card.component';
import { EspnScoreboardComponent } from './components/espn-scoreboard/espn-scoreboard.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { ScrollableTableComponent } from './components/scrollable-table/scrollable-table.component';
import { StickyTableCellComponent } from './components/sticky-table-cell/sticky-table-cell.component';

@NgModule({
  declarations: [
    NoDataComponent,
    ScrollableTableComponent,
    StickyTableCellComponent,
    DropdownFilterComponent,
    EspnScoreboardComponent,
    EspnScoreboardCardComponent,
    EspnScoreboardCardTeamComponent,
    DataVisComponent,
  ],
  imports: [RouterModule, MaterialModule, FlexLayoutModule, CommonModule, ChartsModule],
  exports: [
    DataVisComponent,
    NoDataComponent,
    ScrollableTableComponent,
    StickyTableCellComponent,
    DropdownFilterComponent,
    EspnScoreboardComponent,
    EspnScoreboardCardComponent,
    EspnScoreboardCardTeamComponent,
  ],
})
export class SharedModule {}
