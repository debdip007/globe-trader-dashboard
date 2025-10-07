import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { navItems, INavDataWithPermission } from './_nav';
import { AuthService } from '../../core/services/auth.service';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    ContainerComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent,
    IconDirective,
    NgScrollbar,
    RouterOutlet,
    RouterLink,
    ShadowOnScrollDirective
  ]
})
// export class DefaultLayoutComponent {
//   public navItems = [...navItems];
// }


export class DefaultLayoutComponent implements OnInit {
  public navItems: INavDataWithPermission[] = [];

  constructor(
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const permissions = this.auth.getUserPermissions();
    this.navItems = this.filterNavItems(navItems, permissions);
  }

  private filterNavItems(
    items: INavDataWithPermission[],
    permissions: string[]
  ): INavDataWithPermission[] {
    return items
      .filter(item => !item.permission || permissions.includes(item.permission))
      .map(item => ({
        ...item,
        children: item.children ? this.filterNavItems(item.children as INavDataWithPermission[], permissions) : undefined
      }));
  }

}