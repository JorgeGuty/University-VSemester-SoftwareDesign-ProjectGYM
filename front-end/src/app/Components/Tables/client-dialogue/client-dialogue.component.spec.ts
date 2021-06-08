import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDialogueComponent } from './client-dialogue.component';

describe('ClientDialogueComponent', () => {
  let component: ClientDialogueComponent;
  let fixture: ComponentFixture<ClientDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
