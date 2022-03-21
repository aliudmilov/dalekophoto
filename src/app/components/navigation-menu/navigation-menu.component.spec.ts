import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationMenuComponent } from './navigation-menu.component';

describe('NavigationMenuComponent', () => {
  let component: NavigationMenuComponent;
  let fixture: ComponentFixture<NavigationMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationMenuComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onClick should close/open the menu', () => {
    expect(component.isOpen).toBe(false);

    component.onClick();
    expect(component.isOpen).toBe(true);

    component.onClick();
    expect(component.isOpen).toBe(false);
  });
});
