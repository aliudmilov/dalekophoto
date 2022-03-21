import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent {
  @Input() isOpen = false;

  constructor() {}

  onClick() {
    this.isOpen = !this.isOpen;
  }
}
