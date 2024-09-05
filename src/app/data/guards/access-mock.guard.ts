import { CanActivateFn, Router } from '@angular/router';
import { AuthMockService } from '../services/auth-mock.service';
import { inject } from '@angular/core';

export const canActivateAuthMock: CanActivateFn = (route, state) => {
  const isLoggedIn = inject(AuthMockService).isAuth;

  if (isLoggedIn) {
    return true;
  }

  return inject(Router).createUrlTree(['/login']);
};
