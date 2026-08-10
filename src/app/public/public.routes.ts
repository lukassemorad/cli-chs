import { Routes } from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./pages/home-page/home-page').then((m) => m.HomePage) },
  {
    path: 'o-nas',
    loadComponent: () => import('./pages/about-page/about-page').then((m) => m.AboutPage),
  },
  {
    path: 'kontakt',
    loadComponent: () => import('./pages/contact-page/contact-page').then((m) => m.ContactPage),
  },
  {
    path: 'kurzy',
    loadComponent: () => import('./pages/courses-page/courses-page').then((m) => m.CoursesPage),
  },
  {
    path: 'kurzy/:id',
    loadComponent: () =>
      import('./pages/courses-page/course-detail-page').then((m) => m.CourseDetailPage),
  },
  { path: '**', redirectTo: '' },
];
