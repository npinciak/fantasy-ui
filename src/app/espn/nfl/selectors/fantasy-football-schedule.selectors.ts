import { Selector } from '@ngxs/store';
import { FantasyFootballScheduleState } from '../state/fantasy-football-schedule';

export class FantasyFootballScheduleSelectors {
  @Selector([FantasyFootballScheduleState.map])
  static selectMatchupById(map: { [id: number]: any }): (id: number) => any {
    return (id: number) => map[id];
  }
}
