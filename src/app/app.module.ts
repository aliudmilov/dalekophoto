import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NgxGalleryModule } from '@kolkov/ngx-gallery';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavigationMenuComponent } from '@components/navigation-menu/navigation-menu.component';
import { HomeComponent } from '@components/home/home.component';
import { GalleryComponent } from '@components/gallery/gallery.component';
import { AboutComponent } from '@components/about/about.component';
import { ContactUsComponent } from '@components/contact-us/contact-us.component';
import { AlbumComponent } from '@components/album/album.component';
import { ScrollToTopComponent } from '@components/scroll-to-top/scroll-to-top.component';
import { HeaderComponent } from '@components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationMenuComponent,
    GalleryComponent,
    AboutComponent,
    ContactUsComponent,
    AlbumComponent,
    HomeComponent,
    ScrollToTopComponent,
    HeaderComponent
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

    NgxGalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
