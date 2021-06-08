import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMaxSpacesUpdateDialogueComponent } from './service-max-spaces-update-dialogue.component';

describe('ServiceMaxSpacesUpdateDialogueComponent', () => {
  let component: ServiceMaxSpacesUpdateDialogueComponent;
  let fixture: ComponentFixture<ServiceMaxSpacesUpdateDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceMaxSpacesUpdateDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceMaxSpacesUpdateDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
