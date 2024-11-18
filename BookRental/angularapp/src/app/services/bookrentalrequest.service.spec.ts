import { TestBed } from '@angular/core/testing';

import { BookrentalrequestService } from './bookrentalrequest.service';

describe('BookrentalrequestService', () => {
  let service: BookrentalrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookrentalrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
