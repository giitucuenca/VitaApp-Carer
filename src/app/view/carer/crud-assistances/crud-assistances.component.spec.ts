import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAssistancesComponent } from './crud-assistances.component';

describe('CrudAssistancesComponent', () => {
  let component: CrudAssistancesComponent;
  let fixture: ComponentFixture<CrudAssistancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudAssistancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAssistancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
