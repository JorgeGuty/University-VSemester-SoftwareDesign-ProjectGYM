import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoomDialogueComponent } from './admin-room-dialogue.component';

describe('AdminRoomDialogueComponent', () => {
  let component: AdminRoomDialogueComponent;
  let fixture: ComponentFixture<AdminRoomDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRoomDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRoomDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
