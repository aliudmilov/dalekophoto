import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAlbumDetailsComponent } from './page-album-details.component';

describe('PageAlbumDetailsComponent', () => {
  let component: PageAlbumDetailsComponent;
  let fixture: ComponentFixture<PageAlbumDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageAlbumDetailsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAlbumDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
