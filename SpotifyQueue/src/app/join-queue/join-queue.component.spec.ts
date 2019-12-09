import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinQueueComponent } from './join-queue.component';

describe('JoinQueueComponent', () => {
  let component: JoinQueueComponent;
  let fixture: ComponentFixture<JoinQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
