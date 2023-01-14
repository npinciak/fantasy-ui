import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@app/@core/authentication/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private supaService: AuthenticationService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const sess = await this.supaService.getSession();

    return sess != null ? true : false;
  }
}
