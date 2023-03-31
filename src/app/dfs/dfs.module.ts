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
import { DfsMlbHomeComponent } from './mlb/pages/dfs-mlb-home/dfs-mlb-home.component';
import { DailyFantasyMlbPlayerSlateAttributeState } from './mlb/state/dfs-mlb-player-slate-attr.state';
import { DfsMlbTeamSlateDetailsState } from './mlb/state/dfs-mlb-slate-teams.state';
import { DfsNbaHomeComponent } from './nba/pages/dfs-nba-home/dfs-nba-home.component';
import { DfsNbaSlatePlayerAttributesState } from './nba/state/dfs-nba-slate-players-attributes.state';
import { DfsNflHomeComponent } from './nfl/pages/dfs-nfl-home/dfs-nfl-home.component';
import { DfsNflGridIronState } from './nfl/state/dfs-nfl-grid-iron.state';
import { DfsNflSlatePlayerAttributesState } from './nfl/state/dfs-nfl-players-slate-attributes.state';
import { DfsNflProfilerQbState } from './nfl/state/dfs-nfl-profiler-qb.state';
import { DfsNflProfilerRbState } from './nfl/state/dfs-nfl-profiler-rb.state';
import { DfsNflProfilerTeState } from './nfl/state/dfs-nfl-profiler-te.state';
import { DfsNflProfilerWrState } from './nfl/state/dfs-nfl-profiler-wr.state';
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
  DfsNflSlatePlayerAttributesState,
  DfsNflSlateTeamDetailsState,
  DfsNflProfilerQbState,
  DfsNflGridIronState,
  DfsNbaSlatePlayerAttributesState,
  DfsWeatherState,
];

@NgModule({
  imports: [CommonModule, DfsRoutingModule, FormsModule, MaterialModule, SharedModule, NgxsModule.forFeature(states)],
  declarations: [
    DfsNbaHomeComponent,
    DfsTeamMatchupTableComponent,
    DfsSlateListComponent,
    DfsNflHomeComponent,
    DfsMlbHomeComponent,
    PlayerTableComponent,
  ],
})
export class DfsModule {}
