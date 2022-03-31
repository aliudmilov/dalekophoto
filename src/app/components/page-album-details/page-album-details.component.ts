import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, throwError } from 'rxjs';
import {
  NgxGalleryComponent,
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
  selector: 'app-page-album-details',
  templateUrl: './page-album-details.component.html',
  styleUrls: ['./page-album-details.component.scss']
})
export class PageAlbumDetailsComponent
  extends DestroyAwareComponent
  implements OnInit
{
  @ViewChild(NgxGalleryComponent) gallery!: NgxGalleryComponent;

  defaultOption: NgxGalleryOptions = {
    thumbnails: false,
    preview: false,

    width: '100%',
    height: 'auto',
    image: true,
    imageAnimation: NgxGalleryAnimation.Slide,
    imageSize: NgxGalleryImageSize.Contain,
    imageSwipe: true,
    imageInfinityMove: true,
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

    this.albumImages = result.photos!.map(
      (x) =>
        <NgxGalleryImage>{
          label: x.id,
          small: x.smallImageUrl,
          medium: x.largeImageUrl,
          big: x.largeImageUrl
        }
    );

    const routeParams = this.route.snapshot.queryParamMap;
    const photoIdRouteParam = routeParams.get('photoId');
    if (!photoIdRouteParam) {
      return;
    }

    const imageIndex = this.albumImages.findIndex(
      (x) => x.label === photoIdRouteParam
    );
    if (imageIndex < 0) {
      return;
    }

    this.gallery.show(imageIndex);
  }

  onChange(event: any): void {
    const image = this.albumImages[event.index];
    if (!image) {
      return;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { photoId: image.label },
      queryParamsHandling: 'merge'
    });
  }

  onCloseClicked(): void {
    if (!this.album || this.album.isPorfolio) {
      this.router.navigate([RouteName.Home]);
    } else {
      this.router.navigate(['/album', this.album?.id]);
    }
  }
}
