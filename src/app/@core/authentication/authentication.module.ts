import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AuthenticationFormActionHandler } from './handlers/authentication-form.handler';
import { AuthenticationActionHandler } from './handlers/authentication.handler';
import { AuthenticationFormState } from './state/authentication-form.state';
import { AuthenticationState } from './state/authentication.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forFeature([AuthenticationActionHandler, AuthenticationFormActionHandler, AuthenticationState, AuthenticationFormState]),
  ],
})
export class AuthenticationModule {}
