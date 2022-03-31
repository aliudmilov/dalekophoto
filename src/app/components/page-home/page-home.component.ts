import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, throwError } from 'rxjs';
import { RouteName } from '../../../app/app-routing.module';
import { DestroyAwareComponent } from '@components/destroy-aware-component';
import { Album } from '@models/Album';
import { AlbumService } from '@services/album.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent extends DestroyAwareComponent implements OnInit {
  isBusy = true;
  portfolio?: Album;

  constructor(
    public readonly albumService: AlbumService,
    public readonly router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.isBusy = true;
    this.albumService
      .getPortfolio()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (result) => {
          this.portfolio = result;
          this.isBusy = false;
        },
        error: (error) => {
          this.isBusy = false;
          throwError(() => error);
        }
      });
  }

  initAlbum(result: Album): void {
    this.portfolio = result;
    if (!this.portfolio?.photos) {
      this.router.navigate([RouteName.Home]);
      return;
    }

    // Do more with the album
  }
}
