import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPictogramsAssistanceComponent } from './edit-pictograms-assistance.component';

describe('EditPictogramsAssistanceComponent', () => {
  let component: EditPictogramsAssistanceComponent;
  let fixture: ComponentFixture<EditPictogramsAssistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPictogramsAssistanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPictogramsAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
