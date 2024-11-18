import { TestBed } from '@angular/core/testing';

import { BookrentalrequestService } from './bookrentalrequest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BookrentalrequestService', () => {
  let service: BookrentalrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BookrentalrequestService);
  });

  fit('Frontend_should_create_bookrentalrequest_service', () => {
    expect(service).toBeTruthy();
  });
});
