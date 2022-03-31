import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import {
  LazyLoadImageModule,
  LAZYLOAD_IMAGE_HOOKS,
  ScrollHooks
} from 'ng-lazyload-image';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavigationMenuComponent } from '@components/navigation-menu/navigation-menu.component';
import { AlbumComponent } from '@components/album/album.component';
import { ScrollToTopComponent } from '@components/scroll-to-top/scroll-to-top.component';
import { HeaderComponent } from '@components/header/header.component';
import { PageHomeComponent } from './components/page-home/page-home.component';
import { PageGalleryComponent } from './components/page-gallery/page-gallery.component';
import { PageContactUsComponent } from './components/page-contact-us/page-contact-us.component';
import { PageAboutComponent } from './components/page-about/page-about.component';
import { PageAlbumComponent } from './components/page-album/page-album.component';
import { PageAlbumDetailsComponent } from './components/page-album-details/page-album-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationMenuComponent,
    ScrollToTopComponent,
    AlbumComponent,
    PageHomeComponent,
    PageGalleryComponent,
    PageContactUsComponent,
    PageAboutComponent,
    PageAlbumComponent,
    PageAlbumDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,

    NgxGalleryModule,
    LazyLoadImageModule
  ],
  providers: [{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }],
  bootstrap: [AppComponent]
})
export class AppModule {}
