import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./layout/admin/admin-shell/admin-shell').then((m) => m.AdminShell),
    loadChildren: () => import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/public/public-shell/public-shell').then((m) => m.PublicShell),
    loadChildren: () => import('./public/public.routes').then((m) => m.PUBLIC_ROUTES),
  },
  { path: '**', redirectTo: '' },
];
