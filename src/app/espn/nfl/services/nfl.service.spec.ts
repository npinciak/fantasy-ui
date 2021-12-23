import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NflService } from './nfl.service';

describe('NflService', () => {
  let service: NflService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(NflService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
