import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPictogramHelperComponent } from './edit-pictogram-helper.component';

describe('EditPictogramHelperComponent', () => {
  let component: EditPictogramHelperComponent;
  let fixture: ComponentFixture<EditPictogramHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPictogramHelperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPictogramHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
