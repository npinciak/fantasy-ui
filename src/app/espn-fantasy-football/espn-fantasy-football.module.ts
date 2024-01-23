import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared/shared.module';
import { EspnModule } from '@app/espn/espn.module';
import { MaterialModule } from '@app/material.module';
import { NgxsModule } from '@ngxs/store';
import { FootballLineupCardComponent } from './components/football-lineup-card/football-lineup-card.component';
import { FootballMatchupCardTeamComponent } from './components/football-matchup-card-team/football-matchup-card-team.component';
import { FootballMatchupCardComponent } from './components/football-matchup-card/football-matchup-card.component';
import { EspnFantasyFootballRoutingModule } from './espn-fantasy-football-routing.module';
import { FantasyFootballEventsActionHandler } from './handlers/fantasy-football-events.handler';
import { FantasyFootballFreeAgentActionHandler } from './handlers/fantasy-football-free-agent.handler';
import { FantasyFootballLeagueActionHandler } from './handlers/fantasy-football-league.handler';
import { FantasyFootballPlayerCardActionHandler } from './handlers/fantasy-football-player-card.handler';
import { FantasyBaseballPlayerNewsActionHandler } from './handlers/fantasy-football-player-news.handler';
import { FootballFreeAgentsComponent } from './pages/football-free-agents/football-free-agents.component';
import { FootballHomeComponent } from './pages/football-home/football-home.component';
import { FootballPlayerComponent } from './pages/football-player/football-player.component';
import { FootballTeamComponent } from './pages/football-team/football-team.component';
import { FantasyFootballEventsState } from './state/fantasy-football-events.state';
import { FantasyFootballFreeAgentsFilterState } from './state/fantasy-football-free-agents-filter.state';
import { FantasyFootballFreeAgentsState } from './state/fantasy-football-free-agents.state';
import { FantasyFootballLeagueState } from './state/fantasy-football-league.state';
import { FantasyFootballPlayerCardState } from './state/fantasy-football-player-card.state';
import { FantasyFootballPlayerNewsState } from './state/fantasy-football-player-news.state';
import { FantasyFootballScheduleState } from './state/fantasy-football-schedule.state';
import { FantasyFootballTeamState } from './state/fantasy-football-team.state';
import { FantasyFootballTransactionState } from './state/fantasy-football-transaction.state';

@NgModule({
  declarations: [
    FootballHomeComponent,
    FootballFreeAgentsComponent,
    FootballTeamComponent,
    FootballLineupCardComponent,
    FootballMatchupCardComponent,
    FootballMatchupCardTeamComponent,
    FootballPlayerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    EspnModule,
    EspnFantasyFootballRoutingModule,
    NgxsModule.forFeature([
      FantasyFootballLeagueActionHandler,
      FantasyFootballLeagueState,
      FantasyFootballScheduleState,
      FantasyFootballTeamState,
      FantasyFootballFreeAgentsState,
      FantasyFootballFreeAgentActionHandler,
      FantasyFootballFreeAgentsFilterState,
      FantasyFootballPlayerNewsState,
      FantasyBaseballPlayerNewsActionHandler,
      FantasyFootballPlayerCardState,
      FantasyFootballPlayerCardActionHandler,
      FantasyFootballTransactionState,
      FantasyFootballEventsState,
      FantasyFootballEventsActionHandler,
    ]),
  ],
  exports: [],
})
export class EspnFantasyFootballModule {}
