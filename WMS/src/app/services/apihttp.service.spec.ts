import { TestBed } from '@angular/core/testing';

import { ApihttpService } from './apihttp.service';

describe('ApihttpService', () => {
  let service: ApihttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApihttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
