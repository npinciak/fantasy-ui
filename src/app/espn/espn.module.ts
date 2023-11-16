import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared/shared.module';
import { EspnFastcastModule } from '@app/espn-fastcast/espn-fastcast.module';
import { NgxsModule } from '@ngxs/store';
import { MaterialModule } from 'src/app/material.module';
import { EspnFreeAgentFilterComponentComponent } from './components/espn-free-agent-filter-component/espn-free-agent-filter-component.component';
import { EspnPlayerDialogComponent } from './components/espn-player-dialog/espn-player-dialog.component';
import { EspnPlayerInfoColComponent } from './components/espn-player-info-col/espn-player-info-col.component';
import { EspnPlayerNewsComponent } from './components/espn-player-news/espn-player-news.component';
import { EspnPlayerTrendingColComponent } from './components/espn-player-trending-col/espn-player-trending-col.component';
import { EspnPlayerComponent } from './components/espn-player/espn-player.component';
import { EspnStandingsTableComponent } from './components/espn-standings-table/espn-standings-table.component';
import { EspnStatsTableComponent } from './components/espn-stats-table/espn-stats-table.component';
import { EspnTeamHeaderComponent } from './components/espn-team-header/espn-team-header.component';
import { EspnTeamInfoColComponent } from './components/espn-team-info-col/espn-team-info-col.component';
import { EspnRoutingModule } from './espn-routing.module';
import { BaseballLineupCardComponent } from './mlb/components/baseball-lineup-card/baseball-lineup-card.component';
import { LeagueScoreboardComponent } from './mlb/components/league-scoreboard/league-scoreboard.component';
import { BaseballBattersComponent } from './mlb/pages/baseball-batters/baseball-batters.component';
import { BaseballFreeAgentsComponent } from './mlb/pages/baseball-free-agents/baseball-free-agents.component';
import { BaseballHomeComponent } from './mlb/pages/baseball-home/baseball-home.component';
import { BaseballPitchersComponent } from './mlb/pages/baseball-pitchers/baseball-pitchers.component';
import { BaseballPlayerComponent } from './mlb/pages/baseball-player/baseball-player.component';
import { BaseballTeamComponent } from './mlb/pages/baseball-team/baseball-team.component';
import { EspnHomeComponent } from './pages/espn-home/espn-home.component';
import { FreeAgentsAvailabilitySelectedState } from './state/free-agent-availability-selected.state';

@NgModule({
  declarations: [
    EspnHomeComponent,
    BaseballHomeComponent,
    BaseballFreeAgentsComponent,
    BaseballTeamComponent,
    EspnStatsTableComponent,
    EspnPlayerComponent,
    EspnPlayerNewsComponent,
    EspnPlayerTrendingColComponent,
    EspnPlayerInfoColComponent,
    EspnTeamInfoColComponent,
    LeagueScoreboardComponent,
    EspnPlayerDialogComponent,
    BaseballLineupCardComponent,
    EspnStandingsTableComponent,
    EspnTeamHeaderComponent,
    EspnFreeAgentFilterComponentComponent,
    BaseballPlayerComponent,
    BaseballBattersComponent,
    BaseballPitchersComponent,
  ],
  imports: [
    EspnRoutingModule,
    EspnFastcastModule,
    CommonModule,
    MaterialModule,
    SharedModule,
    NgxsModule.forFeature([FreeAgentsAvailabilitySelectedState]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    EspnStatsTableComponent,
    EspnPlayerComponent,
    EspnPlayerNewsComponent,
    EspnPlayerTrendingColComponent,
    EspnPlayerInfoColComponent,
    EspnTeamInfoColComponent,
    LeagueScoreboardComponent,
    EspnPlayerDialogComponent,
    EspnStandingsTableComponent,
    EspnTeamHeaderComponent,
    EspnFreeAgentFilterComponentComponent,
  ],
})
export class EspnModule {}
