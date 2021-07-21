import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EspnModule } from './espn/espn.module';

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
@NgModule({
  declarations: [AppComponent],
  imports: [
    EspnModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    NgxsSelectSnapshotModule.forRoot(),
    NgxsModule.forRoot([CoreState, MlbState, WeatherState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
