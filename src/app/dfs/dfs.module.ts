import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule, GridModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/@shared/shared.module';
import { MaterialModule } from '@app/material.module';
import { NgxsModule } from '@ngxs/store';
import { SlateListComponent } from './components/slate-list/slate-list.component';
import { TeamMatchupTableComponent } from './components/team-matchup-table/team-matchup-table.component';
import { DfsRoutingModule } from './dfs-routing.module';
import { MatchupTableComponent } from './nfl/components/matchup-table/matchup-table.component';
import { PlayerTableRankingColumnComponent } from './nfl/components/player-table-ranking-column/player-table-ranking-column.component';
import { PlayerTableComponent as NFLPlayerTableHomeComponent } from './nfl/components/player-table/player-table.component';
import { NflDfsLineupState } from './nfl/state/nfl-dfs-lineup.state';
import { NflDfsPlayerMasterState } from './nfl/state/nfl-dfs-player-master.state';
import { NflDfsPlayerSlateState } from './nfl/state/nfl-dfs-player-slate.state';
import { NflDfsProfilerState } from './nfl/state/nfl-dfs-profiler.state';
import { NflDfsTeamSlateState } from './nfl/state/nfl-dfs-team-slate.state';
import { NflDfsState } from './nfl/state/nfl-dfs.state';
import { HomeComponent as DfsHomeComponent } from './pages/home/home.component';
import { DailyFantasyPlayersState } from './state/daily-fantasy-players.state';
import { DailyFantasyScheduleState } from './state/daily-fantasy-schedule.state';
import { DailyFantasySlateAttrState } from './state/daily-fantasy-slate-attr.state';
import { DailyFantasySlateState } from './state/daily-fantasy-slate.state';
import { DailyFantasyTeamsState } from './state/daily-fantasy-team.state';

const states = [
  DailyFantasyPlayersState,
  DailyFantasyScheduleState,
  DailyFantasySlateState,
  DailyFantasySlateAttrState,
  DailyFantasyTeamsState,
  NflDfsState,
  NflDfsProfilerState,
  NflDfsPlayerMasterState,
  NflDfsPlayerSlateState,
  NflDfsTeamSlateState,
  NflDfsLineupState,
];
@NgModule({
  declarations: [
    TeamMatchupTableComponent,
    SlateListComponent,
    NFLPlayerTableHomeComponent,
    MatchupTableComponent,
    PlayerTableRankingColumnComponent,
    DfsHomeComponent,
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
