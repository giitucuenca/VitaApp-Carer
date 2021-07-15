import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPanelComponent } from './gestion-panel.component';

describe('GestionPanelComponent', () => {
  let component: GestionPanelComponent;
  let fixture: ComponentFixture<GestionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
