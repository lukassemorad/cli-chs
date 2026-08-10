import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  HlmSidebarContent,
  HlmSidebarGroup,
  HlmSidebarGroupLabel,
  HlmSidebarHeader,
  HlmSidebarMenu,
  HlmSidebarMenuButton,
  HlmSidebarMenuItem,
} from '@spartan-ng/helm/sidebar';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar-nav',
  imports: [
    NgIcon,
    RouterLink,
    RouterLinkActive,
    HlmSidebarHeader,
    HlmSidebarContent,
    HlmSidebarGroup,
    HlmSidebarGroupLabel,
    HlmSidebarMenu,
    HlmSidebarMenuItem,
    HlmSidebarMenuButton,
  ],
  // HlmSidebar lays its projected content out with `flex flex-col`, expecting the header/content/
  // footer blocks below as direct children. Without `contents` this wrapper component would become
  // a single flex item instead, breaking that layout.
  host: { class: 'contents' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar-nav.html',
})
export class SidebarNav {
  protected readonly navItems: NavItem[] = [
    { path: 'overview', label: 'Přehled', icon: 'lucideHouse' },
    { path: 'projects', label: 'Projekty', icon: 'lucideFolderKanban' },
    { path: 'forms', label: 'Formuláře', icon: 'lucideClipboardList' },
    { path: 'settings', label: 'Nastavení', icon: 'lucideSettings' },
  ];
}
