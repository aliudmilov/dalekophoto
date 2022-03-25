import { Component, OnInit } from '@angular/core';
import { DestroyAwareComponent } from '@components/destroy-aware-component';
import { Album } from '@models/Album';
import { AlbumService } from '@services/album.service';
import { takeUntil, throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends DestroyAwareComponent implements OnInit {
  isBusy = true;
  portfolio?: Album;

  constructor(public readonly albumService: AlbumService) {
    super();
  }

  ngOnInit(): void {
    this.isBusy = true;
    this.albumService
      .getPortfolio()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (result) => {
          this.isBusy = false;
          this.portfolio = result;
        },
        error: (error) => {
          this.isBusy = false;
          throwError(() => error);
        }
      });
  }
}
