import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPictogramComponent } from './edit-pictogram.component';

describe('EditPictogramComponent', () => {
  let component: EditPictogramComponent;
  let fixture: ComponentFixture<EditPictogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPictogramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPictogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
