import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPreliminaryDatePickerComponent } from './admin-preliminary-date-picker.component';

describe('AdminPreliminaryDatePickerComponent', () => {
  let component: AdminPreliminaryDatePickerComponent;
  let fixture: ComponentFixture<AdminPreliminaryDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPreliminaryDatePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPreliminaryDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
