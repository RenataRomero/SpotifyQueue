import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService:AuthService,
            private router:Router,
            private httpClient:HttpClient) {

            }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('Entró a guard');
      console.log(this.authService.isLoggeIn());
    if (this.authService.isLoggeIn()) {
      console.log('Guard dejó pasar');
      return true;
    } else {
      console.log('Falló guard');
      this.router.navigate(['/login'])
      return false;
    }
    // return new Promise(resolve =>
    //   this.authService.isLoggeInPromise()
    //     .then(() => {
    //         this.router.navigate(["/"]);
    //       resolve();
    //     })
    //     .catch(() => {
    //       console.log('hi');
    //       this.router.navigate(["/"]);
    //       resolve(false);
    //       // ... or any other way you want to handle such error case
    //     }))
    return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
