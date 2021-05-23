import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElderlyEditComponent } from './elderly-edit.component';

describe('ElderlyEditComponent', () => {
  let component: ElderlyEditComponent;
  let fixture: ComponentFixture<ElderlyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElderlyEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElderlyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
