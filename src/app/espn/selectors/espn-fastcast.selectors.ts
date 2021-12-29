import { Selector } from '@ngxs/store';

import { FastcastEvent } from '../models/fastcast-event.model';
import { EspnFastcastState } from '../state/espn-fastcast.state';

export class EspnFastcastSelectors {
  @Selector([EspnFastcastState.selectMap])
  static selectEventById(eventMap: { [uid: string]: FastcastEvent }): (id: string) => FastcastEvent {
    return (id: string) => eventMap[id];
  }

  @Selector([EspnFastcastState.selectMap])
  static selectEventsMapList(eventMap: { [id: string]: FastcastEvent }): FastcastEvent[] {
    return Object.values(eventMap).sort((a, b) => a.priority - b.priority);
  }
}
