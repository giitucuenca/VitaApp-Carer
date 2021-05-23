import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageNotContentComponent } from './message-not-content.component';

describe('MessageNotContentComponent', () => {
  let component: MessageNotContentComponent;
  let fixture: ComponentFixture<MessageNotContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageNotContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageNotContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
