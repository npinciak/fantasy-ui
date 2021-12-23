import { Observable, of } from 'rxjs';
import { MOCK_FASTCAST_EVENT_1 } from '../models/fastcast-event.model.mock';
import { LeagueEventList } from '../state/espn-fastcast.state';
import { EspnFastcastFacade } from './espn-fastcast.facade';

export type Mock<T> = { [key in keyof T]: T[key] };

export class EspnFastcastFacadeMock implements Mock<EspnFastcastFacade> {
  selectSportMapOptions$: Observable<any> = of(['nfl']);
  selectLeagueListBySlug$: Observable<any[]>;
  selectLastRefresh$: Observable<number> = of(13245654);

  selectLeagueListBySlug(sport: string): LeagueEventList[] {
    return [
      {
        league: 'nfl',
        events: [MOCK_FASTCAST_EVENT_1],
      },
    ];
  }

  disconnect(): Observable<void> {
    return of();
  }
}
