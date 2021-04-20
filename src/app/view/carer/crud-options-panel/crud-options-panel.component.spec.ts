import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudOptionsPanelComponent } from './crud-options-panel.component';

describe('CrudOptionsPanelComponent', () => {
  let component: CrudOptionsPanelComponent;
  let fixture: ComponentFixture<CrudOptionsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudOptionsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudOptionsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
