import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorTableComponent } from './instructor-table.component';

describe('InstructorTableComponent', () => {
  let component: InstructorTableComponent;
  let fixture: ComponentFixture<InstructorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
