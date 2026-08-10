import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';

@Component({
  selector: 'app-overview-page',
  imports: [HlmBadge, HlmButton, ...HlmCardImports, ...HlmTabsImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './overview-page.html',
})
export class OverviewPage {
  protected readonly features = [
    {
      title: 'Brain komponenty',
      description:
        'Headless, přístupné primitivy bez vlastního stylu — logika a a11y jsou hotové za tebe.',
    },
    {
      title: 'Helm vrstva',
      description:
        'Nastylovaná vrstva nad brain komponentami, generovaná přímo do repozitáře, ne z node_modules.',
    },
    {
      title: 'Tailwind nativně',
      description:
        'Žádný vlastní theming systém navíc — jen CSS proměnné a Tailwind utility třídy.',
    },
  ];
}
