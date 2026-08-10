import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
  lucideCalendarDays,
  lucideClipboardList,
  lucideFolderKanban,
  lucideGraduationCap,
  lucideHouse,
  lucideLogOut,
  lucideMapPin,
  lucideMoon,
  lucideSettings,
  lucideSun,
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
      lucideFolderKanban,
      lucideSettings,
      lucideSun,
      lucideMoon,
      lucideClipboardList,
      lucideLogOut,
      lucideCalendarDays,
      lucideGraduationCap,
      lucideMapPin,
      lucideUsers,
    }),
  ]
};
