import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent {
  @Input() isOpen = false;

  constructor(router: Router) {
    router.events.subscribe((x) => {
      this.isOpen = false;
    });
  }

  onClick() {
    this.isOpen = !this.isOpen;
  }
}
