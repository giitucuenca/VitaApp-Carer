import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElderlyAddComponent } from './elderly-add.component';

describe('ElderlyAddComponent', () => {
  let component: ElderlyAddComponent;
  let fixture: ComponentFixture<ElderlyAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElderlyAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElderlyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
