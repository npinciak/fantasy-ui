import { Selector } from '@ngxs/store';
import { Schedule, ScheduleMap } from '../models/schedule.model';
import { DailyFantasyScheduleState } from '../state/daily-fantasy-schedule.state';

export class DailyFantasyScheduleSelectors {
  @Selector([DailyFantasyScheduleState.getMap])
  static selectGameById(map: ScheduleMap): (id: string) => Schedule {
    return (id: string) => map[id];
  }

  @Selector([DailyFantasyScheduleState.getMap])
  static selectGameList(map: ScheduleMap): Schedule[] {
    return Object.values(map);
  }
}
