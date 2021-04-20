import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAssistancesComponent } from './select-assistances.component';

describe('SelectAssistancesComponent', () => {
  let component: SelectAssistancesComponent;
  let fixture: ComponentFixture<SelectAssistancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAssistancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAssistancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
