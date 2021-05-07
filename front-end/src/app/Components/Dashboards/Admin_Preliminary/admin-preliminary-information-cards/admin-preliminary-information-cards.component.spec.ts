import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPreliminaryInformationCardsComponent } from './admin-preliminary-information-cards.component';

describe('AdminPreliminaryInformationCardsComponent', () => {
  let component: AdminPreliminaryInformationCardsComponent;
  let fixture: ComponentFixture<AdminPreliminaryInformationCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPreliminaryInformationCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPreliminaryInformationCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
