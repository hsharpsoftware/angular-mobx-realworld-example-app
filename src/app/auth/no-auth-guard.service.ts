import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { UserService } from '../shared';

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    return this.userService.isAuthenticated.take(1).map(bool => !bool);

  }
}
