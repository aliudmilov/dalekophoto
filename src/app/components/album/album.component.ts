import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, throwError } from 'rxjs';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
  NgxGalleryImageSize
} from '@kolkov/ngx-gallery';
import { DestroyAwareComponent } from '@components/destroy-aware-component';
import { AlbumService } from '@services/album.service';
import { Album } from '@models/Album';
import { RouteName } from 'src/app/app-routing.module';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent extends DestroyAwareComponent implements OnInit {
  defaultOption: NgxGalleryOptions = {
    thumbnails: false,
    preview: false,

    width: '100%',
    height: 'auto',
    image: true,
    imageAnimation: NgxGalleryAnimation.Slide,
    imageSize: NgxGalleryImageSize.Contain,
    imageSwipe: true,
    arrowPrevIcon: 'fa-solid fa-chevron-left',
    arrowNextIcon: 'fa-solid fa-chevron-right'
  };
  galleryOptions: NgxGalleryOptions[] = [
    {
      ...this.defaultOption
    },
    {
      ...this.defaultOption,
      breakpoint: 1024
    },
    {
      ...this.defaultOption,
      breakpoint: 768
    }
  ];
  isBusy = false;
  album?: Album;
  albumImages: NgxGalleryImage[] = [];

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
          this.isBusy = false;
          this.album = result;
          if (!this.album?.photos) {
            this.router.navigate([RouteName.Home]);
            return;
          }
          this.albumImages = result.photos!.map(
            (x) =>
              <NgxGalleryImage>{
                small: x.smallImageUrl,
                medium: x.largeImageUrl,
                big: x.largeImageUrl
              }
          );
        },
        error: (error) => {
          this.isBusy = false;
          throwError(() => error);
        }
      });
  }

  onCloseClicked(): void {
    if (this.album?.isPorfolio) {
      this.router.navigate([RouteName.Home]);
    } else {
      this.router.navigate([RouteName.Gallery]);
    }
  }
}
