import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicNav } from '../public-nav/public-nav';

@Component({
  selector: 'app-public-shell',
  imports: [PublicNav, RouterOutlet],
  templateUrl: './public-shell.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicShell {}
