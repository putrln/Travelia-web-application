import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class TripMenagerGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.getAuthentication().pipe(
        switchMap((user: any) => {
          return this.auth.hasRequiredMenagerRole(user.uid);
        }),
        map(arr => arr),
        tap(hasRole => {
          if (!hasRole) {
            console.log(hasRole);
            this.router.navigate(['profile']);
          }
        })
      );
  }
  constructor(private auth: AuthService, private router: Router) {}
}
