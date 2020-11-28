import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class TeacherGuard implements CanActivate {
  constructor(private router: Router) { }
  
      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentType')=='estudiante') {
          this.router.navigate(['colegio/estudiante']);
        }
        
        if (localStorage.getItem('currentType')=='tutor') {
          this.router.navigate(['colegio/tutor']);
        }
        
        if (localStorage.getItem('currentType')=='maestro') {
          return true;
        }
        
        if (localStorage.getItem('currentType')=='admin') {
          this.router.navigate(['colegio/admin']);
        }  
            // not logged in so redirect to login page with the return url
            
         
  
          
      }
}
