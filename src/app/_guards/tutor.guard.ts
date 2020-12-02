import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class TutorGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentType') === 'estudiante') {
      this.router.navigate(['colegio/estudiante']);
    }

    if (localStorage.getItem('currentType') === 'tutor') {
      return true;
    }

    if (localStorage.getItem('currentType') === 'maestro') {
      this.router.navigate(['colegio/maestro']);
    }

    if (localStorage.getItem('currentType') === 'admin') {
      this.router.navigate(['colegio/admin']);
    }
    // not logged in so redirect to login page with the return url




  }
}
