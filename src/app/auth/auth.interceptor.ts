import {
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { TokenResponse } from './auth.interface';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token;

  if (!token) return next(req);

  return next(addToken(req, token)).pipe(
    catchError((error) => {
      if (error === '403') {
        return refreshAndProcced(authService, req, next);
      }
      return throwError(error);
    }),
  );
};

const refreshAndProcced = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn,
) => {
  return authService.refreshAuthToken().pipe(
    switchMap((res: TokenResponse) => {
      return next(addToken(req, res.access_token));
    }),
  );
};

const addToken = (req: HttpRequest<any>, token: string) => {
  return (req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }));
};
