import { ActivatedRouteSnapshot, Params } from '@angular/router';

export interface RouterStateModel {
  state?: {
    url: string;
    params: any;
    queryParams: Params;
    snapshot: ActivatedRouteSnapshot;
    data: any;
  };
}

export const INITIAL_STATE: RouterStateModel = {
  state: undefined,
};
