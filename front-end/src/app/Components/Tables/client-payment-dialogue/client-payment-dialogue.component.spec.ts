import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPaymentDialogueComponent } from './client-payment-dialogue.component';

describe('ClientPaymentDialogueComponent', () => {
  let component: ClientPaymentDialogueComponent;
  let fixture: ComponentFixture<ClientPaymentDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientPaymentDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPaymentDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
