import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageAboutComponent } from '@components/page-about/page-about.component';
import { PageAlbumDetailsComponent } from '@components/page-album-details/page-album-details.component';
import { PageAlbumComponent } from '@components/page-album/page-album.component';
import { PageContactUsComponent } from '@components/page-contact-us/page-contact-us.component';
import { PageGalleryComponent } from '@components/page-gallery/page-gallery.component';
import { PageHomeComponent } from '@components/page-home/page-home.component';

export enum RouteName {
  Home = 'home',
  Gallery = 'gallery',
  About = 'about',
  ContactUs = 'contact-us',
  Album = 'album/:id',
  AlbumDetails = 'album-photos/:id'
}
const routes: Routes = [
  { path: RouteName.Home, component: PageHomeComponent },
  { path: RouteName.Gallery, component: PageGalleryComponent },
  { path: RouteName.About, component: PageAboutComponent },
  { path: RouteName.ContactUs, component: PageContactUsComponent },
  { path: RouteName.Album, component: PageAlbumComponent },
  { path: RouteName.AlbumDetails, component: PageAlbumDetailsComponent },
  { path: '**', component: PageHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
