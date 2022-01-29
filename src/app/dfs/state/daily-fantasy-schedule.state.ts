import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Schedule, ScheduleMap } from '../models/schedule.model';

export class PatchSchedule {
  static readonly type = `[dailyFantasySchedule] PatchSchedule`;
  constructor(public payload: { schedule: Schedule[] }) {}
}

export class DailyFantasyScheduleStateModel {
  map: ScheduleMap;
}

@State<DailyFantasyScheduleStateModel>({
  name: 'dailyFantasySchedule',
  defaults: {
    map: {},
  },
})
@Injectable()
export class DailyFantasyScheduleState {
  @Selector([DailyFantasyScheduleState])
  static getMap(state: DailyFantasyScheduleStateModel): ScheduleMap {
    return state.map;
  }

  @Action(PatchSchedule)
  patchPlayers({ getState, patchState }: StateContext<DailyFantasyScheduleStateModel>, { payload: { schedule } }: PatchSchedule) {
    const state = getState();
    const map = entityMap(schedule);

    patchState({ ...state, map });
  }
}
