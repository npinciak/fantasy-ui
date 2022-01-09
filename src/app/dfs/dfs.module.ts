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
import { DfsSlateState } from './mlb/state/dfs-slate.state';
import { NgxsModule } from '@ngxs/store';
import { MlbDfsState } from './mlb/state/mlb-dfs.state';
import { NflDfsLineupState } from './nfl/state/nfl-dfs-lineup.state';
import { NflDfsPlayerMasterState } from './nfl/state/nfl-dfs-player-master.state';
import { NflDfsPlayerSlateState } from './nfl/state/nfl-dfs-player-slate.state';
import { NflDfsProfilerState } from './nfl/state/nfl-dfs-profiler.state';
import { NflDfsTeamState } from './nfl/state/nfl-dfs-team.state';
import { NflDfsState } from './nfl/state/nfl-dfs.state';
import { DailyFantasyPlayersState } from './state/daily-fantasy-players.state';

const states = [
  DailyFantasyPlayersState,
  DfsSlateState,
  MlbDfsState,
  NflDfsState,
  NflDfsTeamState,
  NflDfsProfilerState,
  NflDfsPlayerMasterState,
  NflDfsPlayerSlateState,
  NflDfsLineupState,
];
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
  imports: [
    CommonModule,
    DfsRoutingModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    GridModule,
    SharedModule,
    NgxsModule.forFeature(states),
  ],
})
export class DfsModule {}
