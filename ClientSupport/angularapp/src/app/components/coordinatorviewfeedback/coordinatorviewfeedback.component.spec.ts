import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorviewfeedbackComponent } from './coordinatorviewfeedback.component';

describe('CoordinatorviewfeedbackComponent', () => {
  let component: CoordinatorviewfeedbackComponent;
  let fixture: ComponentFixture<CoordinatorviewfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordinatorviewfeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorviewfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
