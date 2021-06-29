import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDialogueUncheckedComponent } from './admin-dialogue-unchecked.component';

describe('AdminDialogueUncheckedComponent', () => {
  let component: AdminDialogueUncheckedComponent;
  let fixture: ComponentFixture<AdminDialogueUncheckedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDialogueUncheckedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDialogueUncheckedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
