import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';

import { SportsUiLeaguesResolver } from './sports-ui-leagues.resolver';

describe('SportsUiLeaguesResolver', () => {
  let resolver: SportsUiLeaguesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot()],
    });
    resolver = TestBed.inject(SportsUiLeaguesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
