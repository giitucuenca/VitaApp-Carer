import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsSpinnerComponent } from './lds-spinner.component';

describe('LdsSpinnerComponent', () => {
  let component: LdsSpinnerComponent;
  let fixture: ComponentFixture<LdsSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LdsSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
