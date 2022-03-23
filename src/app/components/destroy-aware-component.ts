import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-destroy-aware',
  template: ``
})
export class DestroyAwareComponent implements OnDestroy {
  destroyed$: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.destroyed$.unsubscribe();
  }
}
