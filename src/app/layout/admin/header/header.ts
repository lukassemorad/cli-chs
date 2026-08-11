import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmSidebarTrigger } from '@spartan-ng/helm/sidebar';
import { AdminAuthService } from '../../../core/admin-auth.service';
import { ThemeService } from '../../../core/theme.service';

@Component({
  selector: 'app-header',
  imports: [HlmButton, HlmSidebarTrigger, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
})
export class Header {
  protected readonly theme = inject(ThemeService);
  private readonly adminAuth = inject(AdminAuthService);
  private readonly router = inject(Router);

  protected onLogout(): void {
    this.adminAuth.logout();
    this.router.navigateByUrl('/');
  }
}
