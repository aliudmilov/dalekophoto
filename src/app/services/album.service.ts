import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, of, shareReplay } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';
import { Album } from '@models/Album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private static readonly CacheItemDelay = 1;

  isAllDataLoaded = false;
  cache: Album[] = [];

  constructor(public readonly http: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    if (this.isAllDataLoaded) {
      return of(this.cache).pipe(delay(AlbumService.CacheItemDelay));
    }

    return this.http
      .get<Album[]>(`${environment.baseApiUrl}/api/v1/albums`)
      .pipe<Album[]>(
        map((x: Album[]) => {
          this.cache = x ?? [];
          this.isAllDataLoaded = this.cache?.length > 0;
          return this.cache;
        })
      )
      .pipe(shareReplay());
  }

  getAlbum(id: string): Observable<Album> {
    const cachedItem = this.cache?.find((x) => x.id === id);
    if (cachedItem?.photos?.length) {
      return of(cachedItem).pipe(delay(AlbumService.CacheItemDelay));
    }

    return this.http
      .get<Album>(`${environment.baseApiUrl}/api/v1/albums/${id}`)
      .pipe<Album>(
        map((x: Album) => {
          this.cache.push(x);
          return x;
        })
      )
      .pipe(shareReplay());
  }

  getPortfolio(): Observable<Album> {
    const cachedItem = this.cache?.find((x) => x.isPorfolio);
    if (cachedItem?.photos?.length) {
      return of(cachedItem).pipe(delay(AlbumService.CacheItemDelay));
    }

    return this.http
      .get<Album>(`${environment.baseApiUrl}/api/v1/albums/portfolio`)
      .pipe<Album>(
        map((x: Album) => {
          this.cache.push(x);
          return x;
        })
      )
      .pipe(shareReplay());
  }
}
