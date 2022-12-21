import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule, RouterStateSerializer } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { httpInterceptorProviders } from './@core/interceptors';
import { ShellModule } from './@core/shell/shell.module';
import { AuthenticationFormState } from './@core/store/authentication-form/authentication-form.state';
import { CustomRouterStateSerializer } from './@core/store/router/router-state.serializer';
import { RouterState } from './@core/store/router/router.state';
import { SharedModule } from './@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const states = [AuthenticationFormState, RouterState];
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NgxsRouterPluginModule.forRoot(),
    NgxsModule.forRoot(states, { developmentMode: !environment.production, selectorOptions: { injectContainerState: false } }),
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
  providers: [httpInterceptorProviders, { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
