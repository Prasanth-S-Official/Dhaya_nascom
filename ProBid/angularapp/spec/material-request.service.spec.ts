import { TestBed } from '@angular/core/testing';

import { MaterialRequestService } from './material-request.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MaterialRequestService', () => {
  let service: MaterialRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MaterialRequestService);
  });

  fit('Frontend_should_create_materialRequest_service', () => {
    expect(service).toBeTruthy();
  });
});
