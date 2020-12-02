import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class HomeGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['colegio']);
    }

    if (!localStorage.getItem('currentUser')) {
      return true;
    }

    // not logged in so redirect to login page with the return url




  }
}
