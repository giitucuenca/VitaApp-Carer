import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPictogramsComponent } from './select-pictograms.component';

describe('SelectPictogramsComponent', () => {
  let component: SelectPictogramsComponent;
  let fixture: ComponentFixture<SelectPictogramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPictogramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPictogramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
