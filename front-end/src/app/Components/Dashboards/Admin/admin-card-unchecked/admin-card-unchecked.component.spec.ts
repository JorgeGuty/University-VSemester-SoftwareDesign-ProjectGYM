import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCardUncheckedComponent } from './admin-card-unchecked.component';

describe('AdminCardUncheckedComponent', () => {
  let component: AdminCardUncheckedComponent;
  let fixture: ComponentFixture<AdminCardUncheckedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCardUncheckedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCardUncheckedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
