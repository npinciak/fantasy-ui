import { Selector } from '@ngxs/store';
import { FastcastEvent, FastcastEventMap } from '../models/fastcast-event.model';
import { FastcastEventTeam } from '../models/fastcast-team.model';
import { EspnFastcastEventState } from '../state/espn-fastcast-event.state';
import { EspnFastcastTeamSelectors } from './espn-fastcast-team.selectors';

export class EspnFastcastEventSelectors {
  @Selector([EspnFastcastEventState.selectMap])
  static getEventById(map: FastcastEventMap): (id: string) => FastcastEvent {
    return (id: string) => map[id];
  }

  @Selector([EspnFastcastEventState.selectMap])
  static getEventList(map: FastcastEventMap): FastcastEvent[] {
    return Object.values(map);
  }

  @Selector([EspnFastcastEventState.selectMap])
  static getEventIdList(map: FastcastEventMap): string[] {
    return Object.keys(map);
  }

  @Selector([EspnFastcastEventState.selectMap])
  static getEventIdSet(map: FastcastEventMap): Set<string> {
    return new Set(Object.keys(map));
  }

  @Selector([EspnFastcastEventSelectors.getEventList, EspnFastcastTeamSelectors.getTeamsByEventUid])
  static getFastcastEventsByLeagueId(
    selectEventList: FastcastEvent[],
    getTeamsByEventUid: (id: string) => { [id: string]: FastcastEventTeam }
  ): (id: string) => FastcastEvent[] {
    return (id: string) =>
      selectEventList
        .filter(e => e.leagueId === id)
        .map(e => ({ ...e, teams: getTeamsByEventUid(e.uid) }))
        .sort((a, b) => a.timestamp - b.timestamp);
  }

  @Selector([EspnFastcastTeamSelectors.getTeamById])
  static getFastcastTeamsByLeagueId(selectFastcastTeamById: (id: string) => FastcastEventTeam) {
    return (id: string) => {
      const team = selectFastcastTeamById(id);
    };
  }
}
