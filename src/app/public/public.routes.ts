import { Routes } from '@angular/router';
import { enrollGuard } from './pages/enroll-flow/enroll.guard';

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
    path: 'prihlaseni',
    loadComponent: () => import('./pages/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: 'moje-kurzy',
    loadComponent: () =>
      import('./pages/my-courses-page/my-courses-page').then((m) => m.MyCoursesPage),
  },
  {
    path: 'kurzy',
    loadComponent: () => import('./pages/courses-page/courses-page').then((m) => m.CoursesPage),
  },
  {
    path: 'kurzy/:id/prihlaseni',
    canActivate: [enrollGuard],
    loadComponent: () =>
      import('./pages/enroll-flow/enroll-confirm-page').then((m) => m.EnrollConfirmPage),
  },
  {
    path: 'kurzy/:id/prihlaseni/platba',
    canActivate: [enrollGuard],
    loadComponent: () =>
      import('./pages/enroll-flow/enroll-payment-page').then((m) => m.EnrollPaymentPage),
  },
  {
    path: 'kurzy/:id/prihlaseni/hotovo',
    canActivate: [enrollGuard],
    loadComponent: () =>
      import('./pages/enroll-flow/enroll-success-page').then((m) => m.EnrollSuccessPage),
  },
  {
    path: 'kurzy/:id',
    loadComponent: () =>
      import('./pages/courses-page/course-detail-page').then((m) => m.CourseDetailPage),
  },
  { path: '**', redirectTo: '' },
];
