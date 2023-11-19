import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared/shared.module';
import { EspnModule } from '@app/espn/espn.module';
import { MaterialModule } from '@app/material.module';
import { NgxsModule } from '@ngxs/store';
import { BaseballLineupCardComponent } from './components/baseball-lineup-card/baseball-lineup-card.component';
import { LeagueScoreboardComponent } from './components/league-scoreboard/league-scoreboard.component';
import { EspnFantasyBaseballRoutingModule } from './espn-fantasy-baseball-routing.module';
import { FantasyBaseballEventsActionHandler } from './handlers/fantasy-baseball-events.handler';
import { FantasyBaseballLeagueActionHandler } from './handlers/fantasy-baseball-league.handler';
import { FantasyBaseballPlayerCardActionHandler } from './handlers/fantasy-baseball-player-card.handler';
import { BaseballBattersComponent } from './pages/baseball-batters/baseball-batters.component';
import { BaseballFreeAgentsComponent } from './pages/baseball-free-agents/baseball-free-agents.component';
import { BaseballHomeComponent } from './pages/baseball-home/baseball-home.component';
import { BaseballPitchersComponent } from './pages/baseball-pitchers/baseball-pitchers.component';
import { BaseballPlayerComponent } from './pages/baseball-player/baseball-player.component';
import { BaseballTeamComponent } from './pages/baseball-team/baseball-team.component';
import { FantasyBaseballEventsState } from './state/fantasy-baseball-events.state';
import { FantasyBaseballFreeAgentsFilterState } from './state/fantasy-baseball-free-agents-filter.state';
import { FantasyBaseballFreeAgentsState } from './state/fantasy-baseball-free-agents.state';
import { FantasyBaseballLeagueState } from './state/fantasy-baseball-league.state';
import { FantasyBaseballPlayerCardState } from './state/fantasy-baseball-player-card.state';
import { FantasyBaseballPlayerNewsState } from './state/fantasy-baseball-player-news.state';
import { FantasyBaseballProTeamScheduleState } from './state/fantasy-baseball-pro-team-schedule.state';
import { FantasyBaseballTeamsLiveState } from './state/fantasy-baseball-team-live.state';
import { FantasyBaseballTeamState } from './state/fantasy-baseball-team.state';
import { FantasyBaseballTransactionsState } from './state/fantasy-baseball-transactions.state';

@NgModule({
  declarations: [
    BaseballHomeComponent,
    BaseballFreeAgentsComponent,
    BaseballTeamComponent,
    BaseballPlayerComponent,
    BaseballBattersComponent,
    BaseballPitchersComponent,
    BaseballLineupCardComponent,
    LeagueScoreboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    EspnModule,
    EspnFantasyBaseballRoutingModule,
    NgxsModule.forFeature([
      FantasyBaseballLeagueActionHandler,
      FantasyBaseballLeagueState,
      FantasyBaseballTeamState,
      FantasyBaseballTeamsLiveState,
      FantasyBaseballFreeAgentsState,
      FantasyBaseballFreeAgentsFilterState,
      FantasyBaseballPlayerNewsState,
      FantasyBaseballPlayerCardState,
      FantasyBaseballPlayerCardActionHandler,
      FantasyBaseballEventsState,
      FantasyBaseballEventsActionHandler,
      FantasyBaseballProTeamScheduleState,
      FantasyBaseballTransactionsState,
    ]),
  ],
  exports: [],
})
export class EspnFantasyBaseballModule {}
