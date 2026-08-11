import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmCardImports } from '@spartan-ng/helm/card';

interface ContactItem {
  icon: string;
  label: string;
  value: string;
}

@Component({
  selector: 'app-contact-page',
  imports: [NgIcon, ...HlmCardImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-page.html',
})
export class ContactPage {
  protected readonly contactItems: ContactItem[] = [
    { icon: 'lucideMapPin', label: 'Adresa', value: 'Sportovní 1512, 160 00 Praha 6' },
    { icon: 'lucidePhone', label: 'Telefon', value: '+420 234 567 890' },
    { icon: 'lucideMail', label: 'E-mail', value: 'info@cesky-horosvaz.cz' },
    { icon: 'lucideClock', label: 'Úřední hodiny', value: 'Po–Čt 9:00–15:00' },
  ];
}
