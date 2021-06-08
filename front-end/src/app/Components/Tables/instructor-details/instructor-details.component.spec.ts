import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorDetailsComponent } from './instructor-details.component';

describe('InstructorDetailsComponent', () => {
  let component: InstructorDetailsComponent;
  let fixture: ComponentFixture<InstructorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
