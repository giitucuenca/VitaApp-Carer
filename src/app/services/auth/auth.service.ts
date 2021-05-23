import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { VitaappService } from '../vitaapp/vitaapp.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private vitaapp: VitaappService) {}

  public setSession(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  public logOut(): void {
    localStorage.clear();
    this.router
      .navigateByUrl('/login')
      .finally()
      .then(() => {
        window.location.reload();
      });
  }

  public verifyToken(): Observable<any> {
    return this.vitaapp.validToken();
  }
}
