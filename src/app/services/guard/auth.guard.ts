import { VitaappService } from '../vitaapp/vitaapp.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private vitaappService: VitaappService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.router.url);

    return this.vitaappService.meInformation().pipe(
      map((resp) => {
        if (resp) {
          return true;
        } else {
          this.authService.logOut();
          return false;
        }
      }),
      catchError(() => {
        this.authService.logOut();
        return of(false);
      })
    );
  }
}
