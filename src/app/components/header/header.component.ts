import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { DestroyAwareComponent } from '@components/destroy-aware-component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends DestroyAwareComponent {
  hide = false;

  constructor(public readonly router: Router) {
    super();

    router.events.pipe(takeUntil(this.destroyed$)).subscribe((x) => {
      if (x instanceof NavigationStart) {
        const event = x as NavigationStart;
        console.log(event);
        this.hide = event?.url?.startsWith('/album-photos');
      }
    });
  }
}
