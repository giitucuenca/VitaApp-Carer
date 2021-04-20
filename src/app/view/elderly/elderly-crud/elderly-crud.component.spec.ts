import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElderlyCrudComponent } from './elderly-crud.component';

describe('ElderlyCrudComponent', () => {
  let component: ElderlyCrudComponent;
  let fixture: ComponentFixture<ElderlyCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElderlyCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElderlyCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
