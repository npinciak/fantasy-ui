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
import { EspnScoreboardCardTeamComponent } from './components/espn-scoreboard-card-team/espn-scoreboard-card-team.component';
import { EspnScoreboardCardComponent } from './components/espn-scoreboard-card/espn-scoreboard-card.component';
import { EspnScoreboardComponent } from './components/espn-scoreboard/espn-scoreboard.component';

@NgModule({
  declarations: [
    NoDataComponent,
    DialogComponent,
    ScrollableTableComponent,
    StickyTableCellComponent,
    DropdownFilterComponent,
    EspnScoreboardComponent,
    EspnScoreboardCardComponent,
    EspnScoreboardCardTeamComponent,
  ],
  imports: [RouterModule, MaterialModule, FlexLayoutModule, CommonModule],
  exports: [
    NoDataComponent,
    DialogComponent,
    ScrollableTableComponent,
    StickyTableCellComponent,
    DropdownFilterComponent,
    EspnScoreboardComponent,
    EspnScoreboardCardComponent,
    EspnScoreboardCardTeamComponent,
  ],
})
export class SharedModule {}
