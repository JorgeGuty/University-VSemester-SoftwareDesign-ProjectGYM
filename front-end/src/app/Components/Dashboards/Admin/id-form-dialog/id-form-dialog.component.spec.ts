import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdFormDialogComponent } from './id-form-dialog.component';

describe('IdFormDialogComponent', () => {
  let component: IdFormDialogComponent;
  let fixture: ComponentFixture<IdFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
