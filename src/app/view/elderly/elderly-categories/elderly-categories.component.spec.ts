import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElderlyCategoriesComponent } from './elderly-categories.component';

describe('ElderlyCategoriesComponent', () => {
  let component: ElderlyCategoriesComponent;
  let fixture: ComponentFixture<ElderlyCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElderlyCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElderlyCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
