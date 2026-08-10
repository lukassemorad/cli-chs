import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  {
    path: 'overview',
    loadComponent: () => import('./pages/overview-page/overview-page').then((m) => m.OverviewPage),
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects-page/projects-page').then((m) => m.ProjectsPage),
  },
  {
    path: 'forms',
    loadComponent: () => import('./pages/forms-page/forms-page').then((m) => m.FormsPage),
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings-page/settings-page').then((m) => m.SettingsPage),
  },
  { path: '**', redirectTo: 'overview' },
];
