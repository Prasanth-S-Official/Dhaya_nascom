import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancernavComponent } from './freelancernav.component';

describe('FreelancernavComponent', () => {
  let component: FreelancernavComponent;
  let fixture: ComponentFixture<FreelancernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreelancernavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
