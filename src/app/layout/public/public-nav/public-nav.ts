import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmSheetImports } from '@spartan-ng/helm/sheet';
import { AuthService } from '../../../core/auth.service';
import { ThemeService } from '../../../core/theme.service';

interface PublicNavItem {
  path: string;
  label: string;
}

@Component({
  selector: 'app-public-nav',
  imports: [RouterLink, RouterLinkActive, HlmButton, NgIcon, ...HlmSheetImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './public-nav.html',
})
export class PublicNav {
  protected readonly theme = inject(ThemeService);
  protected readonly auth = inject(AuthService);

  protected readonly navItems: PublicNavItem[] = [
    { path: '/', label: 'Domů' },
    { path: '/kurzy', label: 'Kurzy' },
    { path: '/moje-kurzy', label: 'Mé kurzy' },
    { path: '/o-nas', label: 'O nás' },
    { path: '/kontakt', label: 'Kontakt' },
  ];
}
