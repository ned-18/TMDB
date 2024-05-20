import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Flip } from '@models/index';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [ CardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    component.imgSrc = 'some/image/url.jpg';
    component.title = 'Test Movie';
    component.date = '2024-05-19';
    component.description = 'This is a test description.';
    component.id = 123;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display card content correctly', () => {
    const image = de.query(By.css('.front img'));
    const title = de.query(By.css('.info-overlay p:first-child'));
    const date = de.query(By.css('.info-overlay p:last-child'));

    expect(image.nativeElement.src).toContain(component.imgSrc);
    expect(image.nativeElement.alt).toBe(component.title);
    expect(title.nativeElement.textContent).toBe(component.title);
    expect(date.nativeElement.textContent).toBe('May 19, 2024'); 
  });

  it('should toggle flip state on button click', () => {
    const button = de.query(By.css('button'));

    expect(component.flip).toBe(Flip.Inactive);

    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.flip).toBe(Flip.Active);

    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.flip).toBe(Flip.Inactive); 
  });

  it('should emit cardClick event with correct id', () => {
    spyOn(component.cardClick, 'emit');
    const card = de.query(By.css('.card'));
    card.triggerEventHandler('click', null);

    expect(component.cardClick.emit).toHaveBeenCalledWith(component.id);
  });

  it('should display back side content when flipped', () => {
    component.flip = Flip.Active;
    fixture.detectChanges();

    const backContent = de.query(By.css('.back'));
    expect(backContent).toBeTruthy();
    expect(backContent.nativeElement.textContent).toContain(component.description);
  });
});
