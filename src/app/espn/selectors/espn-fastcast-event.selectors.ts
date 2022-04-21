import { Selector } from '@ngxs/store';
import { FastcastEvent, FastcastEventMap } from '../models/fastcast-event.model';
import { EspnFastcastEventState } from '../state/espn-fastcast-event.state';

export class EspnFastcastEventSelectors {
  @Selector([EspnFastcastEventState.selectMap])
  static selectEventById(map: FastcastEventMap): (id: string) => FastcastEvent {
    return (id: string) => map[id];
  }

  @Selector([EspnFastcastEventState.selectMap])
  static selectEventList(map: FastcastEventMap): FastcastEvent[] {
    return Object.values(map);
  }

  @Selector([EspnFastcastEventState.selectMap])
  static selectEventIdList(map: FastcastEventMap): string[] {
    return Object.keys(map);
  }

  @Selector([EspnFastcastEventState.selectMap])
  static selectEventIdSet(map: FastcastEventMap): Set<string> {
    return new Set(Object.keys(map));
  }

  @Selector([EspnFastcastEventSelectors.selectEventList])
  static selectFastcastEventsByLeagueId(selectEventList: FastcastEvent[]): (id: string) => FastcastEvent[] {
    return (id: string) => selectEventList.filter(e => e.leagueId === id).sort((a, b) => a.timestamp - b.timestamp);
  }
}
