import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from '../core/admin-auth.service';

export const adminGuard: CanActivateFn = (_route, state) => {
  const adminAuth = inject(AdminAuthService);
  const router = inject(Router);

  if (adminAuth.isAuthenticated()) return true;

  return router.createUrlTree(['/admin/login'], {
    queryParams: { redirectTo: state.url },
  });
};
