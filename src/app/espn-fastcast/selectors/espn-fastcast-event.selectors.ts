import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { Selector } from '@app/@shared/models/typed-selector';
import { FastcastEvent } from '../models/fastcast-event.model';
import { EspnFastcastEventsState } from '../state/espn-fastcast-events.state';

export class EspnFastcastEventSelectors extends GenericSelector(EspnFastcastEventsState) {
  @Selector([EspnFastcastEventSelectors.getIdSet])
  static getEventIdSetValid(eventIdSet: Set<string>) {
    return eventIdSet.size > 0;
  }

  @Selector([EspnFastcastEventSelectors.getEventIdSetValid])
  static getFeedLoadingValue(eventIdSetValid: boolean) {
    return eventIdSetValid ? 33 : 0;
  }

  @Selector([EspnFastcastEventSelectors.getList])
  static getFastcastEventsByLeagueId(selectEventList: FastcastEvent[]): (id: string | null) => FastcastEvent[] {
    return (id: string | null) => selectEventList.filter(e => e.leagueId === id).sort((a, b) => a.timestamp - b.timestamp);
  }
}
