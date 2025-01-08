import { TestBed } from '@angular/core/testing';

import { MaterialService } from './material.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MaterialService', () => {
  let service: MaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MaterialService);
  });

  fit('Frontend_should_create_material_service', () => {
    expect(service).toBeTruthy();
  });
});
