import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MLBDfsResolver implements Resolve<void> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot) {}
}
