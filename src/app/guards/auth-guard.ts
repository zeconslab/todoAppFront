import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  // Verificar si el usuario está autenticado
  if (authService.isAuthenticated()) {
    console.log('Usuario autenticado, permitiendo acceso a:', state.url);
    return true;
  } else {
    // No autenticado, redirigir al login
    console.log('Usuario no autenticado, redirigiendo al login desde:', state.url);
    router.navigate(['/login']);
    return false;
  }
};
