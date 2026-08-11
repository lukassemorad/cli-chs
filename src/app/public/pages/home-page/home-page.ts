import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';

interface HomeStat {
  icon: string;
  value: string;
  label: string;
}

interface HomeQuickLink {
  icon: string;
  title: string;
  description: string;
  routerLink: string;
  linkLabel: string;
}

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, NgIcon, HlmBadge, HlmButton, ...HlmCardImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-page.html',
})
export class HomePage {
  protected readonly stats: HomeStat[] = [
    { icon: 'lucideUsers', value: '1 200+', label: 'aktivních členů' },
    { icon: 'lucideMapPin', value: '45', label: 'oddílů po celé ČR' },
    { icon: 'lucideCalendarDays', value: '30+', label: 'kurzů a seminářů ročně' },
  ];

  protected readonly quickLinks: HomeQuickLink[] = [
    {
      icon: 'lucideGraduationCap',
      title: 'Kurzy a semináře',
      description: 'Přehled aktuálních kurzů, seminářů a zkoušek pro všechny úrovně.',
      routerLink: '/kurzy',
      linkLabel: 'Zobrazit kurzy',
    },
    {
      icon: 'lucideUsers',
      title: 'O nás',
      description: 'Poslání svazu, hlavní oblasti činnosti a komunita, kterou tvoříme.',
      routerLink: '/o-nas',
      linkLabel: 'Zjistit více',
    },
    {
      icon: 'lucideMapPin',
      title: 'Kontakt',
      description: 'Sídlo svazu, telefon, e-mail a úřední hodiny sekretariátu.',
      routerLink: '/kontakt',
      linkLabel: 'Zobrazit kontakt',
    },
  ];
}
