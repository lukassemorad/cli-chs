import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmBadge } from '@spartan-ng/helm/badge';
import {
  HlmSidebarContent,
  HlmSidebarFooter,
  HlmSidebarGroup,
  HlmSidebarGroupLabel,
  HlmSidebarHeader,
  HlmSidebarMenu,
  HlmSidebarMenuButton,
  HlmSidebarMenuItem,
} from '@spartan-ng/helm/sidebar';

interface NavItem {
  key: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar-nav',
  imports: [
    HlmBadge,
    NgIcon,
    HlmSidebarHeader,
    HlmSidebarContent,
    HlmSidebarFooter,
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
    { key: 'overview', label: 'Přehled', icon: 'lucideHouse' },
    { key: 'projects', label: 'Projekty', icon: 'lucideFolderKanban' },
    { key: 'forms', label: 'Formuláře', icon: 'lucideClipboardList' },
    { key: 'settings', label: 'Nastavení', icon: 'lucideSettings' },
  ];

  public readonly activeKey = model(this.navItems[0].key);
}
