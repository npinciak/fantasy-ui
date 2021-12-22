import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule, GridModule } from '@angular/flex-layout';
import { SharedModule } from '@app/@shared/shared.module';
import { MaterialModule } from '@app/material.module';
import { PlayerTableComponent } from './components/player-table/player-table.component';
import { TeamMatchupTableComponent } from './components/team-matchup-table/team-matchup-table.component';
import { FormsModule } from '@angular/forms';

import { DfsRoutingModule } from './dfs-routing.module';

import { SlateListComponent } from './components/slate-list/slate-list.component';

import { HomeComponent as MLBHomeComponent } from './mlb/pages/home/home.component';

import { HomeComponent as NFLHomeComponent } from './nfl/pages/home/home.component';
import { PlayerTableComponent as NFLPlayerTableHomeComponent } from './nfl/components/player-table/player-table.component';
import { MatchupTableComponent } from './nfl/components/matchup-table/matchup-table.component';
import { PlayerTableRankingColumnComponent } from './nfl/components/player-table-ranking-column/player-table-ranking-column.component';

@NgModule({
  declarations: [
    MLBHomeComponent,
    PlayerTableComponent,
    TeamMatchupTableComponent,
    SlateListComponent,
    NFLHomeComponent,
    NFLPlayerTableHomeComponent,
    MatchupTableComponent,
    PlayerTableRankingColumnComponent,
  ],
  imports: [CommonModule, DfsRoutingModule, FormsModule, MaterialModule, FlexLayoutModule, GridModule, SharedModule],
})
export class DfsModule {}
