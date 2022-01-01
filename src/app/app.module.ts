import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NgxsModule } from '@ngxs/store';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { CoreState } from './@core/store/core/core.state';
import { environment } from 'src/environments/environment';
import { FantasyBaseballLeagueState } from './espn/mlb/state/fantasy-baseball-league.state';
import { httpInterceptorProviders } from './@core/interceptors';
import { SharedModule } from './@shared/shared.module';
import { FantasyFootballLeagueState } from './espn/nfl/state/fantasy-football-league.state';
import { MlbDfsState } from './dfs/mlb/state/mlb-dfs.state';
import { DfsSlateState } from './dfs/mlb/state/dfs-slate.state';
import { NflDfsState } from './dfs/nfl/state/nfl-dfs.state';
import { NflDfsProfilerState } from './dfs/nfl/state/nfl-dfs-profiler.state';
import { NflDfsPlayerMasterState } from './dfs/nfl/state/nfl-dfs-player-master.state';
import { NflDfsPlayerSlateState } from './dfs/nfl/state/nfl-dfs-player-slate.state';
import { NflDfsTeamState } from './dfs/nfl/state/nfl-dfs-team.state';
import { NflDfsLineupState } from './dfs/nfl/state/nfl-dfs-lineup.state';
import { FantasyBaseballTeamState } from './espn/mlb/state/fantasy-baseball-team.state';
import { EspnFastcastState } from './espn/state/espn-fastcast.state';
import { EspnFastcastLeagueState } from './espn/state/espn-fastcast-league.state';
import { ShellModule } from './@core/shell/shell.module';
import { ShellState } from './@core/shell/state/shell.state';
import { FantasyFootballScheduleState } from './espn/nfl/state/fantasy-football-schedule.state';
import { FantasyFootballTeamsState } from './espn/nfl/state/fantasy-football-teams.state';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    SharedModule,
    ShellModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxsSelectSnapshotModule.forRoot(),
    NgxsModule.forRoot(
      [
        FantasyBaseballTeamState,
        CoreState,
        DfsSlateState,
        EspnFastcastState,
        FantasyFootballLeagueState,
        FantasyFootballScheduleState,
        FantasyFootballTeamsState,
        EspnFastcastLeagueState,
        MlbDfsState,
        FantasyBaseballLeagueState,
        NflDfsState,
        NflDfsTeamState,
        NflDfsProfilerState,
        NflDfsPlayerMasterState,
        NflDfsPlayerSlateState,
        NflDfsLineupState,
        ShellState,
      ],
      {
        developmentMode: !environment.production,
      }
    ),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
