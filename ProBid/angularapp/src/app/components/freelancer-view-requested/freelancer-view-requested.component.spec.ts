import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerViewRequestedComponent } from './freelancer-view-requested.component';

describe('FreelancerViewRequestedComponent', () => {
  let component: FreelancerViewRequestedComponent;
  let fixture: ComponentFixture<FreelancerViewRequestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreelancerViewRequestedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancerViewRequestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
