import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPictogramsComponent } from './edit-pictograms.component';

describe('EditPictogramsComponent', () => {
  let component: EditPictogramsComponent;
  let fixture: ComponentFixture<EditPictogramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPictogramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPictogramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
