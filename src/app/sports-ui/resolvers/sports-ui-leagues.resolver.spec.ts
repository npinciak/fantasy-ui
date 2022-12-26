import { TestBed } from '@angular/core/testing';

import { SportsUiLeaguesResolver } from './sports-ui-leagues.resolver';

describe('SportsUiLeaguesResolver', () => {
  let resolver: SportsUiLeaguesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SportsUiLeaguesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
