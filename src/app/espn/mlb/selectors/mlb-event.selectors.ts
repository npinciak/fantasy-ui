import { Selector } from '@ngxs/store';
import { MlbEvent } from '../models/mlb-event.model';
import { MlbEventState } from '../state/mlb-event.state';

export class MlbEventSelectors {
  @Selector([MlbEventState.getEventMap])
  static selectEventMap(events: { [id: string]: MlbEvent }): { [id: string]: MlbEvent } {
    return events;
  }

  @Selector([MlbEventSelectors.selectEventMap])
  static selectEventList(events: { [id: string]: MlbEvent }): MlbEvent[] {
    return Object.values(events);
  }

  @Selector([MlbEventSelectors.selectEventMap])
  static selectGameById(event: { [id: string]: MlbEvent }): (id: string) => MlbEvent {
    return (id: string) => event[id];
  }
}
