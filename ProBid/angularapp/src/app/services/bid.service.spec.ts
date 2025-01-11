import { TestBed } from '@angular/core/testing';

import { BidService } from './bid.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BidService', () => {
  let service: BidService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BidService);
  });

  fit('Frontend_should_create_bid_service', () => {
    expect(service).toBeTruthy();
  });
});
