import { Selector } from '@ngxs/store';
import { NflEvent } from '../models/nfl-event.model';
import { NflEventState } from '../state/nfl-event.state';
export class NflEventSelectors {
  @Selector([NflEventState.getEventMap])
  static selectEventMap(events: { [id: string]: NflEvent }): { [id: string]: NflEvent } {
    return events;
  }

  @Selector([NflEventSelectors.selectEventMap])
  static selectEventList(events: { [id: string]: NflEvent }): NflEvent[] {
    return Object.values(events);
  }

  @Selector([NflEventSelectors.selectEventMap])
  static selectGameById(event: { [id: string]: NflEvent }): (id: string) => NflEvent {
    return (id: string) => event[id];
  }
}
