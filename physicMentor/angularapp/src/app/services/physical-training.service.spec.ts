import { TestBed } from '@angular/core/testing';

import { PhysicalTrainingService } from './physical-training.service';

describe('PhysicalTrainingService', () => {
  let service: PhysicalTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhysicalTrainingService);
  });

  fit('Frontend_should_create_physicaltraining_service', () => {
    expect(service).toBeTruthy();
  });
});
