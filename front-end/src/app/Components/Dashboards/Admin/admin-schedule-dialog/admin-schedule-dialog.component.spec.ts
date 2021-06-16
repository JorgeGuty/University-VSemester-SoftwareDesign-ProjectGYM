import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScheduleDialogComponent } from './admin-schedule-dialog.component';

describe('AdminScheduleDialogComponent', () => {
  let component: AdminScheduleDialogComponent;
  let fixture: ComponentFixture<AdminScheduleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminScheduleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminScheduleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
