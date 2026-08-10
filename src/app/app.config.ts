import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  lucideClipboardList,
  lucideFolderKanban,
  lucideHouse,
  lucideMoon,
  lucideSettings,
  lucideSun,
} from '@ng-icons/lucide';
import { provideNativeDateAdapter } from '@spartan-ng/brain/date-time';
import { provideSpartanHlm } from '@spartan-ng/helm/utils';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideSpartanHlm(),
    provideNativeDateAdapter(),
    provideIcons({
      lucideHouse,
      lucideFolderKanban,
      lucideSettings,
      lucideSun,
      lucideMoon,
      lucideClipboardList,
    }),
  ]
};
