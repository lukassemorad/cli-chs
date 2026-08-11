import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  {
    path: 'overview',
    loadComponent: () => import('./pages/overview-page/overview-page').then((m) => m.OverviewPage),
  },
  {
    path: 'kurzy',
    loadComponent: () =>
      import('./pages/courses-page/courses-admin-page').then((m) => m.CoursesAdminPage),
  },
  {
    path: 'kurzy/:id',
    loadComponent: () =>
      import('./pages/courses-page/course-admin-detail-page').then((m) => m.CourseAdminDetailPage),
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings-page/settings-page').then((m) => m.SettingsPage),
  },
  { path: '**', redirectTo: 'overview' },
];
