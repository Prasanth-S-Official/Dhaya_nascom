import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorViewRequirementsComponent } from './coordinator-view-requirements.component';

describe('CoordinatorViewRequirementsComponent', () => {
  let component: CoordinatorViewRequirementsComponent;
  let fixture: ComponentFixture<CoordinatorViewRequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordinatorViewRequirementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorViewRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
