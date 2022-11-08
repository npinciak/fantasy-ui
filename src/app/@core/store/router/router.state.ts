import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { State } from '@ngxs/store';

export interface RouterStateModel {
  url: string;
  params: Params;
  queryParams: Params;
  data: any;
}

@State<RouterStateModel>({
  name: 'routerState',
  defaults: {
    url: '',
    params: {},
    queryParams: {},
    data: '',
  },
})
@Injectable()
export class RouterState {}
