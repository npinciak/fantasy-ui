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
