import { TestBed } from '@angular/core/testing';

import { WifiSchemeRequestService } from './wifi-scheme-request.service';

describe('WifiSchemeRequestService', () => {
  let service: WifiSchemeRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WifiSchemeRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
