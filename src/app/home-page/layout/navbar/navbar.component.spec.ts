import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkWithHref } from '@angular/router'; 
import { NavbarComponent } from './navbar.component';

fdescribe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule], 
      declarations: [NavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two navigation links', () => {
    const links = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    expect(links.length).toBe(2);
  });

  it('should have a link to "/movies" with "Movie" text', () => {
    const link = fixture.debugElement.query(By.css('li[routerLink="/movies"]')); 
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent).toContain('Movie');
  });

  it('should have a link to "/tv-shows" with "TV Shows" text', () => {
    const link = fixture.debugElement.query(By.css('li[routerLink="/tv-shows"]')); 
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent).toContain('TV Shows');
  });
});
