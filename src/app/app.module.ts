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
import { ShellModule } from './@core/shell/shell.module';
import { CustomRouterStateSerializer } from './@core/store/router/router-state.serializer';
import { RouterState } from './@core/store/router/router.state';
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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    // NgxsRouterPluginModule.forRoot(),
    NgxsModule.forRoot([RouterState], {
      developmentMode: !environment.production,
      selectorOptions: { injectContainerState: false, suppressErrors: false },
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production, actionSanitizer, stateSanitizer }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    AuthenticationModule,
    SharedModule,
    ShellModule,
    AppRoutingModule,
  ],
  providers: [httpInterceptorProviders, { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
