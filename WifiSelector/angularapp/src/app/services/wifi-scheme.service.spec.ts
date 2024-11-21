import { TestBed } from '@angular/core/testing';

import { WifiSchemeService } from './wifi-scheme.service';

describe('WifiSchemeService', () => {
  let service: WifiSchemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WifiSchemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
