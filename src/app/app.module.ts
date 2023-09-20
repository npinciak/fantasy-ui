import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { RouterStateSerializer } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { AuthenticationModule } from './@core/authentication/authentication.module';
import { httpInterceptorProviders } from './@core/interceptors';
import { CustomRouterStateSerializer } from './@core/router/router-state.serializer';
import { RouterState } from './@core/router/router.state';
import { ShellModule } from './@core/shell/shell.module';
import { FangraphsConstantsActionHandler } from './@shared/fangraphs/fangraphs-const.handler';
import { FangraphsConstantsState } from './@shared/fangraphs/fangraphs-const.state';
import { SharedModule } from './@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const actionSanitizer = (action: { action: any; payload: any; type: string; addedStates?: any }) => {
  const uiRouterActions = /router+/g;
  return uiRouterActions.test(action.type) ? { type: action.type, transition: sanitizeUIRouterTransition(action) } : action;
};

const stateSanitizer = (state): any => {
  if (state.router && state.router.state) {
    return {
      ...state,
      router: sanitizeUIRouterTransition(state.router.state),
    };
  }
  return state;
};

const sanitizeUIRouterTransition = (routerState: any): any => {
  const { params, data, url, queryParams } = routerState;
  return {
    queryParams,
    params,
    data,
    url,
  };
};

const reduxDevtoolsExtensionOptions = {
  actionSanitizer,
  stateSanitizer,
};

const ngxsConfig = {
  developmentMode: !environment.production,
  selectorOptions: { injectContainerState: false, suppressErrors: false },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AuthenticationModule,
    SharedModule,
    ShellModule,
    NgxsModule.forRoot([RouterState, FangraphsConstantsState, FangraphsConstantsActionHandler], ngxsConfig),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production, actionSanitizer, stateSanitizer }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000',
    }),
    AppRoutingModule,
  ],
  providers: [httpInterceptorProviders, { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
