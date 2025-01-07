import { TestBed } from '@angular/core/testing';

import { DriverService } from './driver.service';

describe('DriverService', () => {
  let service: DriverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverService);
  });

  it('Frontend_should_create_feedback_service', () => {
    expect(service).toBeTruthy();
  });
});
