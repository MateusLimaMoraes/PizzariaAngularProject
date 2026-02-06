import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLogged = await authService.isLoggedIn();

  if (isLogged) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};