import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Album } from '@models/Album';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  constructor(public readonly http: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${environment.baseApiUrl}/api/v1/albums`);
  }

  getAlbum(id: string): Observable<Album> {
    return this.http.get<Album>(
      `${environment.baseApiUrl}/api/v1/albums/${id}`
    );
  }

  getPortfolio(): Observable<Album> {
    return this.http.get<Album>(
      `${environment.baseApiUrl}/api/v1/albums/portfolio`
    );
  }
}
