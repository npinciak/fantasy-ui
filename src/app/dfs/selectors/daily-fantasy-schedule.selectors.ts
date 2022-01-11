import { Selector } from '@ngxs/store';
import { Schedule } from '../models/schedule.model';

import { DailyFantasyScheduleState } from '../state/daily-fantasy-schedule.state';

export class DailyFantasyScheduleSelectors {
  @Selector([DailyFantasyScheduleState.getMap])
  static selectGameById(map: { [id: string]: Schedule }): (id: string) => Schedule {
    return (id: string) => map[id];
  }

  @Selector([DailyFantasyScheduleState.getMap])
  static selectGameList(map: { [id: string]: Schedule }): Schedule[] {
    return Object.values(map);
  }
}
