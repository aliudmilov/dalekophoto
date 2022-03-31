import { Component, OnInit } from '@angular/core';
import { takeUntil, throwError } from 'rxjs';
import { DestroyAwareComponent } from '@components/destroy-aware-component';
import { Album } from '@models/Album';
import { Photo } from '@models/Photo';
import { AlbumService } from '@services/album.service';

@Component({
  selector: 'app-page-gallery',
  templateUrl: './page-gallery.component.html',
  styleUrls: ['./page-gallery.component.scss']
})
export class PageGalleryComponent
  extends DestroyAwareComponent
  implements OnInit
{
  isBusy = true;
  albums?: Album[];
  photos = new Map<string, Photo[]>();

  constructor(public readonly albumService: AlbumService) {
    super();
  }

  ngOnInit(): void {
    this.isBusy = true;
    this.albumService
      .getAlbums()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (result) => {
          this.albums = result.filter((x) => !x.isPorfolio);
          this.initPhotoMap();
          this.isBusy = false;
        },
        error: (error) => {
          this.isBusy = false;
          throwError(() => error);
        }
      });
  }

  initPhotoMap(): void {
    if (!this.albums?.length) {
      return;
    }

    this.albums.forEach((x) => {
      this.photos.set(x.id, x.photos?.filter((x) => x.isFeatured) ?? []);
    });
  }

  getFeaturedPhotos(album: Album): Array<Photo> | undefined {
    if (!album) {
      return;
    }

    return this.photos.get(album.id);
  }

  getMorePhotosLabel(album: Album): string | undefined {
    if (!album?.photos?.length) {
      return undefined;
    }

    const featuredPhotosLength = this.getFeaturedPhotos(album)!.length;
    const diffWithoutFeatured = album.photos.length - featuredPhotosLength;

    return `${diffWithoutFeatured} more...`;
  }
}
