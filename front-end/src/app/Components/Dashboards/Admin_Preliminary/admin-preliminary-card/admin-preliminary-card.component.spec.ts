import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPreliminaryCardComponent } from './admin-preliminary-card.component';

describe('AdminPreliminaryCardComponent', () => {
  let component: AdminPreliminaryCardComponent;
  let fixture: ComponentFixture<AdminPreliminaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPreliminaryCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPreliminaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
