import { Component, OnInit } from '@angular/core';
import { takeUntil, throwError } from 'rxjs';
import { DestroyAwareComponent } from '@components/destroy-aware-component';
import { Album } from '@models/Album';
import { AlbumService } from '@services/album.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent extends DestroyAwareComponent implements OnInit {
  isBusy = false;
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
      this.router.navigate(['']);
    }
    this.isBusy = true;
    this.albumService
      .getAlbum(idRouteParam!)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (result) => {
          this.isBusy = false;
          this.album = result;
          if (!this.album) {
            this.router.navigate(['']);
          }
        },
        error: (error) => {
          this.isBusy = false;
          throwError(() => error);
        }
      });
  }
}
