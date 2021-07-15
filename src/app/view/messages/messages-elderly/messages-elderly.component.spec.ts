import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesElderlyComponent } from './messages-elderly.component';

describe('MessagesElderlyComponent', () => {
  let component: MessagesElderlyComponent;
  let fixture: ComponentFixture<MessagesElderlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesElderlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesElderlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
