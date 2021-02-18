import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user', title: 'User',  icon: 'person', class: '' },
    { path: '/brands', title: 'Brands',  icon: 'library_books', class: '' },
    { path: '/merchants', title: 'Merchants',  icon: 'bubble_chart', class: '' },
    { path: '/campaigns', title: 'Campaigns',  icon: 'content_paste', class: '' },
    { path: '/polls', title: 'Polls',  icon: 'poll', class: '' },
    { path: '/lucky-draw', title: 'Lucky Draw',  icon: 'card_giftcard', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
