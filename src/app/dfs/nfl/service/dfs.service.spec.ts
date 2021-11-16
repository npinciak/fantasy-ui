import { TestBed } from '@angular/core/testing';

import { DfsService } from './dfs.service';

describe('DfsService', () => {
  let service: DfsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DfsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
