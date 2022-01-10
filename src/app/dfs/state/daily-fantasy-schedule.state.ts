import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { Schedule } from '../models/daily-fantasy-client.model';

export class PatchSchedule {
  static readonly type = `[dailyFantasySchedule] PatchPlayers`;
  constructor(public payload: { schedule: Schedule[] }) {}
}

export class DailyFantasyScheduleStateModel {
  map: { [id: string]: Schedule };
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
  static getMap(state: DailyFantasyScheduleStateModel): { [id: string]: Schedule } {
    return state.map;
  }

  @Action(PatchSchedule)
  patchPlayers({ getState, patchState }: StateContext<DailyFantasyScheduleStateModel>, { payload: { schedule } }: PatchSchedule) {
    const state = getState();
    const map = entityMap(schedule);

    patchState({ ...state, map });
  }
}
