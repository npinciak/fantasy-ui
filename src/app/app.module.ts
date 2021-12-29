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
import { MlbState } from './espn/mlb/state/mlb.state';
import { httpInterceptorProviders } from './@core/interceptors';
import { WeatherState } from './espn/weather/state/weather.state';
import { SharedModule } from './@shared/shared.module';
import { NflState } from './espn/nfl/state/nfl.state';
import { MlbDfsState } from './dfs/mlb/state/mlb-dfs.state';
import { DfsModule } from './dfs/dfs.module';
import { DfsSlateState } from './dfs/mlb/state/dfs-slate.state';
import { NflDfsState } from './dfs/nfl/state/nfl-dfs.state';
import { NflDfsProfilerState } from './dfs/nfl/state/nfl-dfs-profiler.state';
import { NflDfsPlayerMasterState } from './dfs/nfl/state/nfl-dfs-player-master.state';
import { NflDfsPlayerSlateState } from './dfs/nfl/state/nfl-dfs-player-slate.state';
import { NflDfsTeamState } from './dfs/nfl/state/nfl-dfs-team.state';
import { NflDfsLineupState } from './dfs/nfl/state/nfl-dfs-lineup.state';
import { MlbEventState } from './espn/mlb/state/mlb-event.state';
import { BaseballTeamState } from './espn/mlb/state/baseball-team.state';
import { EspnFastcastState } from './espn/state/espn-fastcast.state';
import { ShellModule } from './@core/shell/shell.module';
import { ShellState } from './@core/shell/state/shell.state';
import { FantasyFootballScheduleState } from './espn/nfl/state/fantasy-football-schedule';

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
        BaseballTeamState,
        CoreState,
        DfsSlateState,
        EspnFastcastState,
        FantasyFootballScheduleState,
        MlbDfsState,
        MlbEventState,
        MlbState,
        NflDfsState,
        NflDfsTeamState,
        NflDfsProfilerState,
        NflDfsPlayerMasterState,
        NflDfsPlayerSlateState,
        NflDfsLineupState,
        NflState,
        WeatherState,
        ShellState,
      ],
      {
        developmentMode: !environment.production,
      }
    ),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
