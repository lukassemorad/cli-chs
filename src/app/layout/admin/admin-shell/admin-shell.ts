import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmSidebar, HlmSidebarInset, HlmSidebarWrapper } from '@spartan-ng/helm/sidebar';
import { Header } from '../header/header';
import { SidebarNav } from '../sidebar-nav/sidebar-nav';

@Component({
  selector: 'app-admin-shell',
  imports: [HlmSidebarWrapper, HlmSidebar, HlmSidebarInset, Header, SidebarNav, RouterOutlet],
  templateUrl: './admin-shell.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminShell {}
