import { TestBed } from '@angular/core/testing';

import { EspnService } from './espn.service';

describe('EspnService', () => {
  let service: EspnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
