import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { TokenResponse } from './auth.interface';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);

  baseApiUrl = 'https://icherniakov.ru/yt-course/auth';

  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth(): boolean {
    if (!this.token) this.token = localStorage.getItem('token');
    return !!this.token;
  }

  login(payload: { username: string; password: string }) {
    const fd = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}/token`, fd)
      .pipe(tap((res) => this.saveTokens(res)));
  }

  refreshAuthToken() {
    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}/token`, {
        refreshToken: this.refreshToken,
      })
      .pipe(tap((res) => this.saveTokens(res)));

    // catchError((err) => {
    //   this.logout();
    //   return throwError(err);
    // })
  }

  logout() {
    localStorage.clear();
    this.token = null;
    this.refreshToken = null;

    this.router.navigate(['login']);
  }

  saveTokens(res: TokenResponse) {
    this.token = res.access_token;
    this.refreshToken = res.refresh_token;

    localStorage.setItem('token', this.token);
    localStorage.setItem('refreshToken', this.refreshToken);
  }
}
