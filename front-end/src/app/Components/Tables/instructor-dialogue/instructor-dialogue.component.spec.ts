import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorDialogueComponent } from './instructor-dialogue.component';

describe('InstructorDialogueComponent', () => {
  let component: InstructorDialogueComponent;
  let fixture: ComponentFixture<InstructorDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
