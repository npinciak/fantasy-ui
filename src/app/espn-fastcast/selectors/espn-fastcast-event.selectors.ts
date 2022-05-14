import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { Selector } from '@ngxs/store';
import { FastcastEvent } from '../models/fastcast-event.model';
import { FastcastEventTeam } from '../models/fastcast-team.model';
import { EspnFastcastEventState } from '../state/espn-fastcast-event.state';
import { EspnFastcastTeamSelectors } from './espn-fastcast-team.selectors';

export class EspnFastcastEventSelectors extends GenericSelector(EspnFastcastEventState) {
  @Selector([EspnFastcastEventSelectors.getList, EspnFastcastTeamSelectors.getTeamsByEventUid])
  static getFastcastEventsByLeagueId(
    selectEventList: FastcastEvent[],
    getTeamsByEventUid: (id: string) => { [id: string]: FastcastEventTeam }
  ): (id: string) => FastcastEvent[] {
    return (id: string) => selectEventList.filter(e => e.leagueId === id).sort((a, b) => a.timestamp - b.timestamp);
  }

  @Selector([EspnFastcastTeamSelectors.getById])
  static getFastcastTeamsByLeagueId(selectFastcastTeamById: (id: string) => FastcastEventTeam) {
    return (id: string) => {
      const team = selectFastcastTeamById(id);
    };
  }
}
