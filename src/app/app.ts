import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HlmSidebar, HlmSidebarInset, HlmSidebarWrapper } from '@spartan-ng/helm/sidebar';
import { Header } from './layout/header/header';
import { SidebarNav } from './layout/sidebar-nav/sidebar-nav';
import { FormsPage } from './pages/forms-page/forms-page';
import { OverviewPage } from './pages/overview-page/overview-page';
import { ProjectsPage } from './pages/projects-page/projects-page';
import { SettingsPage } from './pages/settings-page/settings-page';

@Component({
  selector: 'app-root',
  imports: [
    HlmSidebarWrapper,
    HlmSidebar,
    HlmSidebarInset,
    Header,
    SidebarNav,
    OverviewPage,
    ProjectsPage,
    FormsPage,
    SettingsPage,
  ],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app.css',
})
export class App {
  protected readonly activeNavKey = signal('overview');
}
