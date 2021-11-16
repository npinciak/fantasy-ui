import { TestBed } from '@angular/core/testing';

import { SlateService } from './slate.service';

describe('SlateService', () => {
  let service: SlateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
