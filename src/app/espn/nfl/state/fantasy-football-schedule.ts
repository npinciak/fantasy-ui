import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { EspnClientScheduleEntry } from '@app/espn/espn-client.model';
import { State, Action, Selector, StateContext, Store } from '@ngxs/store';

export class PatchFantasyFootballSchedule {
  public static readonly type = `[fantasyFootballSchedule] PatchFantasyFootballSchedule`;
  constructor(public payload: { schedule: EspnClientScheduleEntry[] }) {}
}

interface FantasyFootballScheduleStateModel {
  map: { [id: string]: any };
  isLoading: boolean;
}

@State<FantasyFootballScheduleStateModel>({
  name: 'fantasyFootballSchedule',
  defaults: {
    map: {},
    isLoading: true,
  },
})
@Injectable()
export class FantasyFootballScheduleState {
  constructor(private store: Store) {}

  @Selector()
  static map(state: FantasyFootballScheduleStateModel) {
    return state.map;
  }

  @Action(PatchFantasyFootballSchedule)
  patchFantasyFootballSchedule(
    { getState, patchState, dispatch }: StateContext<FantasyFootballScheduleStateModel>,
    { payload: { schedule } }: PatchFantasyFootballSchedule
  ) {
    const state = getState();

    const map = entityMap(schedule);

    patchState({ ...state, map });
  }
}
