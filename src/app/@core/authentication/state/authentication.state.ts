import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

export interface AuthenticationStateModel {
  token?: string;
}

@State<AuthenticationStateModel>({
  name: 'authentication',
  defaults: {},
})
@Injectable()
export class AuthenticationState {}
