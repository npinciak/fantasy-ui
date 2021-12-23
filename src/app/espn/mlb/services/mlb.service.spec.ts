import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MlbService } from './mlb.service';

describe('MlbService', () => {
  let service: MlbService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(MlbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
