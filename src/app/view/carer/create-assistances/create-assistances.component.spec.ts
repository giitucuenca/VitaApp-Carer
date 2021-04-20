import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssistancesComponent } from './create-assistances.component';

describe('CreateAssistancesComponent', () => {
  let component: CreateAssistancesComponent;
  let fixture: ComponentFixture<CreateAssistancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAssistancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAssistancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
