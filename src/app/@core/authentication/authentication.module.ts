import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AuthenticationFormState } from './authentication-form/authentication-form.state';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxsModule.forFeature([AuthenticationFormState])],
})
export class AuthenticationModule {}
