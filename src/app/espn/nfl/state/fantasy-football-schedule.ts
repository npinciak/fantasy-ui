import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext, Store } from '@ngxs/store';

export class PatchFantasyFootballSchedule {
  public static readonly type = `[fantasyFootballSchedule] PatchFantasyFootballSchedule`;
  constructor(public payload: { schedule: any[] }) {}
}

interface FantasyFootballScheduleStateModel {
  schedule: { [id: string]: any };
  isLoading: boolean;
}

@State<FantasyFootballScheduleStateModel>({
  name: 'fantasyFootballSchedule',
  defaults: {
    schedule: {},
    isLoading: true,
  },
})
@Injectable()
export class FantasyFootballScheduleState {
  constructor(private store: Store) {}

  @Selector()
  static schedule(state: FantasyFootballScheduleStateModel) {
    return state.schedule;
  }

  @Action(PatchFantasyFootballSchedule)
  patchFantasyFootballSchedule(
    { getState, patchState, dispatch }: StateContext<FantasyFootballScheduleStateModel>,
    { payload: { schedule } }: PatchFantasyFootballSchedule
  ) {
    const state = getState();

    patchState({ ...state, schedule });
  }
}
