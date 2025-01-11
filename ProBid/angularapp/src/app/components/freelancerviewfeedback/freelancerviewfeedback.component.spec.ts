import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerviewfeedbackComponent } from './freelancerviewfeedback.component';

describe('FreelancerviewfeedbackComponent', () => {
  let component: FreelancerviewfeedbackComponent;
  let fixture: ComponentFixture<FreelancerviewfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreelancerviewfeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancerviewfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
