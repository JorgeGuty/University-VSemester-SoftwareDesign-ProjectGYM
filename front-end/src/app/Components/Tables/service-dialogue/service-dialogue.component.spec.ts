import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDialogueComponent } from './service-dialogue.component';

describe('ServiceDialogueComponent', () => {
  let component: ServiceDialogueComponent;
  let fixture: ComponentFixture<ServiceDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
