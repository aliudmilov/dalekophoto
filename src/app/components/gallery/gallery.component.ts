import { Component, OnInit } from '@angular/core';
import { DestroyAwareComponent } from '@components/destroy-aware-component';
import { Album } from '@models/Album';
import { AlbumService } from '@services/album.service';
import { takeUntil, throwError } from 'rxjs';

@Component({
  selector: 'app-gallery-home',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent extends DestroyAwareComponent implements OnInit {
  isBusy = true;
  albums?: Album[];

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
          this.albums = result;
          this.isBusy = false;
        },
        error: (error) => {
          this.isBusy = false;
          throwError(() => error);
        }
      });
  }
}
