import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsWebsocketPluginModule } from '@ngxs/websocket-plugin';
import { ChartsModule } from 'ng2-charts';
import { environment } from 'src/environments/environment';
import { httpInterceptorProviders } from './@core/interceptors';
import { ShellModule } from './@core/shell/shell.module';
import { ShellState } from './@core/shell/state/shell.state';
import { CoreState } from './@core/store/core/core.state';
import { LocalStorageState } from './@core/store/local-storage/local-storage.state';
import { SharedModule } from './@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EspnFastcastEventState } from './espn/state/espn-fastcast-event.state';
import { EspnFastcastLeagueState } from './espn/state/espn-fastcast-league.state';
import { EspnFastcastState } from './espn/state/espn-fastcast.state';

const states = [CoreState, EspnFastcastState, EspnFastcastEventState, EspnFastcastLeagueState, ShellState, LocalStorageState];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ChartsModule,
    HttpClientModule,
    NgxsSelectSnapshotModule.forRoot(),
    NgxsWebsocketPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({ key: LocalStorageState }),
    NgxsModule.forRoot(states, { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    SharedModule,
    ShellModule,
    AppRoutingModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
