import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorViewTrainersComponent } from './coordinator-view-trainers.component';

describe('CoordinatorViewTrainersComponent', () => {
  let component: CoordinatorViewTrainersComponent;
  let fixture: ComponentFixture<CoordinatorViewTrainersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordinatorViewTrainersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorViewTrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
