import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPreliminaryDashboardComponent } from './admin-preliminary-dashboard.component';

describe('AdminPreliminaryDashboardComponent', () => {
  let component: AdminPreliminaryDashboardComponent;
  let fixture: ComponentFixture<AdminPreliminaryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPreliminaryDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPreliminaryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
