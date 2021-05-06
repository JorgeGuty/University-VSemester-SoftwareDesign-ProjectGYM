import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPreliminaryDialogComponent } from './admin-preliminary-dialog.component';

describe('AdminPreliminaryDialogComponent', () => {
  let component: AdminPreliminaryDialogComponent;
  let fixture: ComponentFixture<AdminPreliminaryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPreliminaryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPreliminaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
