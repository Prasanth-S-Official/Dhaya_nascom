import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerviewprojectComponent } from './freelancerviewproject.component';

describe('FreelancerviewprojectComponent', () => {
  let component: FreelancerviewprojectComponent;
  let fixture: ComponentFixture<FreelancerviewprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreelancerviewprojectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancerviewprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
