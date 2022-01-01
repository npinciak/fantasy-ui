import { MOCK_DATA_ESPN } from '@app/@shared/helpers/testConfigs';
import { Observable, of } from 'rxjs';
import { MlbFacade } from './mlb.facade';

export type Mock<T> = { [key in keyof T]: T[key] };

export class MockMlbFacade implements Mock<MlbFacade> {
  standings$: Observable<any[]>;
  liveScore$: Observable<any[]>;
  gamesMap$: Observable<{ [id: number]: any }>;
  sortedGamesByStartTime$: Observable<any[]>;
  noEvents$: Observable<boolean>;
  teamsEmpty$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  scoringPeriod: number;
  teamsEmpty: boolean;

  selectEventById = (id: number) => MOCK_DATA_ESPN.ESPN_EVENT;
  selectTeamById = (id: number) => MOCK_DATA_ESPN.ESPN_TEAM;
  getLeague = (leagueId: number) => null;
}
