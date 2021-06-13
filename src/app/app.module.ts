import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EspnModule } from './modules/espn/espn.module';

import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NgxsModule } from '@ngxs/store';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { CoreState } from './@core/store/core/core.state';
import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from 'src/environments/environment';
import { MlbState } from './modules/espn/store/mlb/mlb.state';
import { MlbTeamState } from './modules/espn/store/mlb/mlb-team.state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    EspnModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgxsSelectSnapshotModule.forRoot(),
    NgxsModule.forRoot([CoreState, MlbState, MlbTeamState], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),
    FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
