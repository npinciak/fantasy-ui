import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule, GridModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/@shared/shared.module';
import { MaterialModule } from '@app/material.module';
import { NgxsModule } from '@ngxs/store';
import { PlayerTableComponent } from './components/player-table/player-table.component';
import { DfsSlateListComponent } from './components/slate-list/slate-list.component';
import { DfsTeamMatchupTableComponent } from './components/team-matchup-table/team-matchup-table.component';
import { DfsRoutingModule } from './dfs-routing.module';
import { DailyFantasyMlbPlayerSlateAttributeState } from './mlb/state/daily-fantasy-mlb-player-slate-attr.state';
import { DailyFantasyMlbTeamSlateAttributeState } from './mlb/state/daily-fantasy-mlb-team-slate-attr.state';
import { PlayerTableRankingColumnComponent } from './nfl/components/player-table-ranking-column/player-table-ranking-column.component';
import { DailyFantasyNflGridIronState } from './nfl/state/daily-fantasy-nfl-grid-iron.state';
import { DailyFantasyNflPlayersSlateAttributeState } from './nfl/state/daily-fantasy-nfl-players-slate-attr.state';
import { DailyFantasyNflProfilerQBState } from './nfl/state/daily-fantasy-nfl-profiler-qb.state';
import { DailyFantasyNflProfilerRBState } from './nfl/state/daily-fantasy-nfl-profiler-rb.state';
import { DailyFantasyNflProfilerTEState } from './nfl/state/daily-fantasy-nfl-profiler-te.state';
import { DailyFantasyNflProfilerWRState } from './nfl/state/daily-fantasy-nfl-profiler-wr.state';
import { DailyFantasyNflTeamSlateAttributeState } from './nfl/state/daily-fantasy-nfl-team-slate-attr.state';
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
  DailyFantasyMlbPlayerSlateAttributeState,
  DailyFantasyMlbTeamSlateAttributeState,
  DailyFantasyNflProfilerQBState,
  DailyFantasyNflProfilerRBState,
  DailyFantasyNflProfilerWRState,
  DailyFantasyNflProfilerTEState,
  DailyFantasyNflPlayersSlateAttributeState,
  DailyFantasyNflTeamSlateAttributeState,
  DailyFantasyNflProfilerQBState,
  DailyFantasyNflGridIronState,
];

const declarations = [
  DfsTeamMatchupTableComponent,
  DfsSlateListComponent,
  PlayerTableRankingColumnComponent,
  DfsHomeComponent,
  PlayerTableComponent,
];

const imports = [
  CommonModule,
  DfsRoutingModule,
  FormsModule,
  MaterialModule,
  FlexLayoutModule,
  GridModule,
  SharedModule,
  NgxsModule.forFeature(states),
];

@NgModule({
  declarations,
  imports,
})
export class DfsModule {}
