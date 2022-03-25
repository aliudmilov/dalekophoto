import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '@components/about/about.component';
import { AlbumComponent } from '@components/album/album.component';
import { ContactUsComponent } from '@components/contact-us/contact-us.component';
import { GalleryComponent } from '@components/gallery/gallery.component';
import { HomeComponent } from '@components/home/home.component';

export enum RouteName {
  Home = 'home',
  Gallery = 'gallery',
  About = 'about',
  ContactUs = 'contact-us',
  Album = 'album/:id'
}
const routes: Routes = [
  { path: RouteName.Home, component: HomeComponent },
  { path: RouteName.Gallery, component: GalleryComponent },
  { path: RouteName.About, component: AboutComponent },
  { path: RouteName.ContactUs, component: ContactUsComponent },
  { path: RouteName.Album, component: AlbumComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
