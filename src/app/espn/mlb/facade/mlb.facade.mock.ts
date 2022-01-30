import { Mock } from '@app/@shared/models/mock.model';
import { of } from 'rxjs';
import { MlbFacade } from './mlb.facade';

export class MockMlbFacade implements Mock<MlbFacade> {
  standings$ = of([]);
  liveScore$ = of([]);
  gamesMap$ = of([]);
  sortedGamesByStartTime$ = of([]);
  noEvents$ = of(true);
  teamsEmpty$ = of(false);
  isLoading$ = of(false);
  scoringPeriod = 0;
  teamsEmpty = true;

  getLeague = (leagueId: number) => null;
}
