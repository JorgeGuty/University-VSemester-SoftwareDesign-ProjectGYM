import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDialogueChangeComponent } from './admin-dialogue-change.component';

describe('AdminDialogueChangeComponent', () => {
  let component: AdminDialogueChangeComponent;
  let fixture: ComponentFixture<AdminDialogueChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDialogueChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDialogueChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
