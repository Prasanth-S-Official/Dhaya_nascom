import { TestBed } from '@angular/core/testing';

import { PhysicalTrainingService } from './physical-training.service';

describe('PhysicalTrainingService', () => {
  let service: PhysicalTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhysicalTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
