import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmCardImports } from '@spartan-ng/helm/card';

interface FocusArea {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about-page',
  imports: [NgIcon, ...HlmCardImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about-page.html',
})
export class AboutPage {
  protected readonly focusAreas: FocusArea[] = [
    {
      icon: 'lucideTarget',
      title: 'Sportovní lezení',
      description:
        'Podporujeme závodní i rekreační lezení na umělých stěnách a v boulderových centrech.',
    },
    {
      icon: 'lucideMountainSnow',
      title: 'Horolezectví a skialpinismus',
      description:
        'Organizujeme výstupy, expedice a metodické kurzy pro pohyb ve skalách i v horách.',
    },
    {
      icon: 'lucideGraduationCap',
      title: 'Vzdělávání',
      description:
        'Připravujeme kurzy, semináře a zkoušky pro instruktory, cvičitele a lezeckou veřejnost.',
    },
    {
      icon: 'lucideUsers',
      title: 'Oddíly a mládež',
      description:
        'Podporujeme lezecké oddíly a vedeme děti a mládež k bezpečnému pohybu ve výškách.',
    },
  ];
}
