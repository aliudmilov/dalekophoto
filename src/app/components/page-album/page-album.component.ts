import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, throwError } from 'rxjs';
import { RouteName } from '../../../app/app-routing.module';
import { DestroyAwareComponent } from '@components/destroy-aware-component';
import { Album } from '@models/Album';
import { AlbumService } from '@services/album.service';

@Component({
  selector: 'app-page-album',
  templateUrl: './page-album.component.html',
  styleUrls: ['./page-album.component.scss']
})
export class PageAlbumComponent
  extends DestroyAwareComponent
  implements OnInit
{
  isBusy = true;
  album?: Album;

  constructor(
    public readonly albumService: AlbumService,
    public readonly router: Router,
    public readonly route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const idRouteParam = routeParams.get('id');
    if (!idRouteParam) {
      this.router.navigate([RouteName.Home]);
      return;
    }
    this.isBusy = true;
    this.albumService
      .getAlbum(idRouteParam!)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (result) => {
          this.initAlbum(result);
          this.isBusy = false;
        },
        error: (error) => {
          this.isBusy = false;
          throwError(() => error);
        }
      });
  }

  initAlbum(result: Album): void {
    this.album = result;
    if (!this.album?.photos) {
      this.router.navigate([RouteName.Home]);
      return;
    }

    // Do more with the album
  }
}
