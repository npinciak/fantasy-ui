// Define a router serializer in /store/router/router-state.serializer.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngxs/router-plugin';
import { RouterStateModel } from './router-state.model';

// The route state serializer will on route changes serialize the activated route into an object which reflect our state model
@Injectable({
  providedIn: 'root',
})
export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateModel> {
  serialize(routerState: RouterStateSnapshot): RouterStateModel {
    const {
      url,
      root: { queryParams },
    } = routerState;
    let route: ActivatedRouteSnapshot | null = routerState.root;
    let params = {};
    let data = {};

    while (route) {
      params = { ...params, ...route.params };
      data = { ...data, ...route.data };
      route = route.firstChild;
    }

    const snapshot = this.serializeRoute(routerState.root);

    return { state: { url, params, queryParams, data, snapshot } };
  }

  private serializeRoute(route: ActivatedRouteSnapshot, omitPathFromRoot = false): ActivatedRouteSnapshot {
    const children = route.children.map(c => this.serializeRoute(c, omitPathFromRoot));
    return {
      url: route.url,
      params: route.params,
      queryParams: route.queryParams,
      fragment: route.fragment!,
      data: route.data,
      outlet: route.outlet,
      component: null,
      routeConfig: route.routeConfig ? { data: route.routeConfig.data } : null,
      root: null as any,
      parent: null,
      firstChild: children[0] ?? null,
      children,
      pathFromRoot: omitPathFromRoot ? (undefined as any) : route.pathFromRoot.map(p => this.serializeRoute(p, true)),
      paramMap: route.paramMap,
      queryParamMap: route.queryParamMap,
      toString: route.toString,
    };
  }
}
