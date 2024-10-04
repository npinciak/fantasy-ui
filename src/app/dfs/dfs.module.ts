import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/@shared/shared.module';
import { MaterialModule } from '@app/material.module';
import { NgxsModule } from '@ngxs/store';
import { PlayerTableComponent } from './components/player-table/player-table.component';
import { DfsSlateListComponent } from './components/slate-list/slate-list.component';
import { DfsRoutingModule } from './dfs-routing.module';
import { DfsSlatePlayersHandlerState } from './handlers/dfs-slate-players.handlers';
import { DfsSlatesHandlerState } from './handlers/dfs-slates.handler';
import { DfsMlbHomeComponent } from './mlb/pages/dfs-mlb-home/dfs-mlb-home.component';
import { DailyFantasyMlbPlayerSlateAttributeState } from './mlb/state/dfs-mlb-player-slate-attr.state';
import { DfsMlbTeamSlateDetailsState } from './mlb/state/dfs-mlb-slate-teams.state';
import { DfsNbaHomeComponent } from './nba/pages/dfs-nba-home/dfs-nba-home.component';
import { DfsNbaSlatePlayerAttributesState } from './nba/state/dfs-nba-slate-players-attributes.state';
import { DfsNflMatchupComponent } from './nfl/components/dfs-nfl-matchup/dfs-nfl-matchup.component';
import { NflMatchupRowComponent } from './nfl/components/nfl-matchup-row/nfl-matchup-row.component';
import { DfsNflGridIronHandlerState } from './nfl/handlers/dfs-nfl-gridiron.handler';
import { DfsNflSlateDetailsHandlerState } from './nfl/handlers/dfs-nfl-slate-details.handler';
import { DfsNflHomeComponent } from './nfl/pages/dfs-nfl-home/dfs-nfl-home.component';
import { DfsNflGridIronState } from './nfl/state/dfs-nfl-grid-iron.state';
import { DfsNflSlatePlayerDetailsState } from './nfl/state/dfs-nfl-slate-player-details.state';
import { DfsNflSlateTeamDetailsState } from './nfl/state/dfs-nfl-slate-team-details.state';
import { DfsHomeComponent } from './pages/dfs-home/dfs-home.component';
import { DfsFilterState } from './state/dfs-filter.state';
import { DfsMatchupsState } from './state/dfs-matchups.state';
import { DfsSelectedLineupState } from './state/dfs-selected-lineup.state';
import { DfsSelectedSlateConfigurationState } from './state/dfs-selected-slate-configuration.state';
import { DfsSlatePlayersState } from './state/dfs-slate-players.state';
import { DfsSlatesState } from './state/dfs-slates.state';
import { DfsTeamsState } from './state/dfs-teams.state';
import { DfsWeatherState } from './state/dfs-weather.state';

const states = [
  DfsSlatePlayersState,
  DfsSlatePlayersHandlerState,
  DfsSelectedSlateConfigurationState,
  DfsFilterState,
  DfsMatchupsState,
  DfsSlatesState,
  DfsSlatesHandlerState,
  DfsTeamsState,
  DailyFantasyMlbPlayerSlateAttributeState,
  DfsMlbTeamSlateDetailsState,
  DfsNflSlateDetailsHandlerState,
  DfsNflSlatePlayerDetailsState,
  DfsNflSlateTeamDetailsState,
  DfsNflGridIronState,
  DfsNflGridIronHandlerState,
  DfsNbaSlatePlayerAttributesState,
  DfsWeatherState,
  DfsSelectedLineupState,
];

@NgModule({
  imports: [CommonModule, DfsRoutingModule, FormsModule, MaterialModule, SharedModule, NgxsModule.forFeature(states)],
  declarations: [
    DfsHomeComponent,
    DfsNflMatchupComponent,
    NflMatchupRowComponent,
    DfsNbaHomeComponent,
    DfsSlateListComponent,
    DfsNflHomeComponent,
    DfsMlbHomeComponent,
    PlayerTableComponent,
  ],
})
export class DfsModule {}
