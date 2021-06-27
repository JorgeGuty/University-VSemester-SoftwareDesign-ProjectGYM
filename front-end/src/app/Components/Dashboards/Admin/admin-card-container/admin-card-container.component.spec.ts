import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCardContainerComponent } from './admin-card-container.component';

describe('AdminCardContainerComponent', () => {
  let component: AdminCardContainerComponent;
  let fixture: ComponentFixture<AdminCardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCardContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
