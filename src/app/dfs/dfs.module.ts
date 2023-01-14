import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/@shared/shared.module';
import { MaterialModule } from '@app/material.module';
import { NgxsModule } from '@ngxs/store';
import { PlayerTableComponent } from './components/player-table/player-table.component';
import { DfsSlateListComponent } from './components/slate-list/slate-list.component';
import { DfsTeamMatchupTableComponent } from './components/team-matchup-table/team-matchup-table.component';
import { DfsRoutingModule } from './dfs-routing.module';
import { DailyFantasyMlbPlayerSlateAttributeState } from './mlb/state/dfs-mlb-player-slate-attr.state';
import { DfsMlbTeamSlateDetailsState } from './mlb/state/dfs-mlb-slate-teams.state';
import { PlayerTableRankingColumnComponent } from './nfl/components/player-table-ranking-column/player-table-ranking-column.component';
import { DfsNflHomeComponent } from './nfl/pages/dfs-nfl-home/dfs-nfl-home.component';
import { DfsNflGridIronState } from './nfl/state/dfs-nfl-grid-iron.state';
import { DfsNflProfilerQbState } from './nfl/state/dfs-nfl-profiler-qb.state';
import { DfsNflProfilerRbState } from './nfl/state/dfs-nfl-profiler-rb.state';
import { DfsNflProfilerTeState } from './nfl/state/dfs-nfl-profiler-te.state';
import { DfsNflProfilerWrState } from './nfl/state/dfs-nfl-profiler-wr.state';
import { DfsNflSlatePlayerState } from './nfl/state/dfs-nfl-slate-players.state';
import { DfsNflSlateTeamDetailsState } from './nfl/state/dfs-nfl-slate-teams.state';
import { DfsMatchupsState } from './state/dfs-matchups.state';
import { DfsSlatePlayersState } from './state/dfs-players.state';
import { DfsSlateAttributesState } from './state/dfs-slate-attr.state';
import { DfsSlatesState } from './state/dfs-slates.state';
import { DfsTeamsState } from './state/dfs-team.state';
import { DfsWeatherState } from './state/dfs-weather.state';

const states = [
  DfsSlatePlayersState,
  DfsMatchupsState,
  DfsSlatesState,
  DfsSlateAttributesState,
  DfsTeamsState,
  DailyFantasyMlbPlayerSlateAttributeState,
  DfsMlbTeamSlateDetailsState,
  DfsNflProfilerQbState,
  DfsNflProfilerRbState,
  DfsNflProfilerWrState,
  DfsNflProfilerTeState,
  DfsNflSlatePlayerState,
  DfsNflSlateTeamDetailsState,
  DfsNflProfilerQbState,
  DfsNflGridIronState,
  DfsWeatherState,
];

const declarations = [
  DfsTeamMatchupTableComponent,
  DfsSlateListComponent,
  PlayerTableRankingColumnComponent,
  DfsNflHomeComponent,
  PlayerTableComponent,
];

const imports = [CommonModule, DfsRoutingModule, FormsModule, MaterialModule, SharedModule, NgxsModule.forFeature(states)];

@NgModule({
  declarations,
  imports,
})
export class DfsModule {}
