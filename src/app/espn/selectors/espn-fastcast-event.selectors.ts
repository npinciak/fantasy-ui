import { Selector } from '@ngxs/store';
import { FastcastEvent } from '../models/fastcast-event.model';
import { EspnFastcastEventState } from '../state/espn-fastcast-event.state';

export class EspnFastcastEventSelectors {
  @Selector([EspnFastcastEventState.selectMap])
  static selectEventById(map: { [id: string]: FastcastEvent }): (id: string) => FastcastEvent {
    return (id: string) => map[id];
  }

  @Selector([EspnFastcastEventState.selectMap])
  static selectEventList(map: { [id: string]: FastcastEvent }): FastcastEvent[] {
    return Object.values(map);
  }

  @Selector([EspnFastcastEventSelectors.selectEventList])
  static selectFastcastEventsByLeagueId(selectEventList: FastcastEvent[]): (id: string) => FastcastEvent[] {
    return (id: string) => selectEventList.filter(e => e.leagueId === id).sort((a, b) => a.timestamp - b.timestamp);
  }
}
