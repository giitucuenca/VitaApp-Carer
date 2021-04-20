import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalCollapsePanelComponent } from './horizontal-collapse-panel.component';

describe('HorizontalCollapsePanelComponent', () => {
  let component: HorizontalCollapsePanelComponent;
  let fixture: ComponentFixture<HorizontalCollapsePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalCollapsePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalCollapsePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
