import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

export const enrollGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.user()) return true;

  const id = route.paramMap.get('id');
  return router.createUrlTree(['/prihlaseni'], {
    queryParams: { redirectTo: `/kurzy/${id}/prihlaseni` },
  });
};
