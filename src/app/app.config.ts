import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
  lucideCalendarDays,
  lucideCircleCheck,
  lucideClock,
  lucideGraduationCap,
  lucideHouse,
  lucideLogIn,
  lucideLogOut,
  lucideMail,
  lucideMapPin,
  lucideMenu,
  lucideMoon,
  lucideMountainSnow,
  lucidePhone,
  lucideSettings,
  lucideSun,
  lucideTarget,
  lucideUserRound,
  lucideUsers,
} from '@ng-icons/lucide';
import { provideNativeDateAdapter } from '@spartan-ng/brain/date-time';
import { provideSpartanHlm } from '@spartan-ng/helm/utils';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideSpartanHlm(),
    provideNativeDateAdapter(),
    provideIcons({
      lucideHouse,
      lucideSettings,
      lucideSun,
      lucideMoon,
      lucideLogIn,
      lucideLogOut,
      lucideCalendarDays,
      lucideGraduationCap,
      lucideMapPin,
      lucideMenu,
      lucideUsers,
      lucideTarget,
      lucideMountainSnow,
      lucidePhone,
      lucideMail,
      lucideClock,
      lucideUserRound,
      lucideCircleCheck,
    }),
  ]
};
