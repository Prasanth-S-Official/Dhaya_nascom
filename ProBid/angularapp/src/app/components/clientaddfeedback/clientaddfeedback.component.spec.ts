import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientaddfeedbackComponent } from './clientaddfeedback.component';

describe('ClientaddfeedbackComponent', () => {
  let component: ClientaddfeedbackComponent;
  let fixture: ComponentFixture<ClientaddfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientaddfeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientaddfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
