import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';

export class SetSportValue {
  static readonly type = '[espnAddLeagueForm] SetSportValue';
  constructor(public payload: { sport: string }) {}
}

export class SetLeagueIdValue {
  static readonly type = '[espnAddLeagueForm] SetLeagueIdValue';
  constructor(public payload: { leagueId: string }) {}
}

export class Reset {
  static readonly type = '[espnAddLeagueForm] Reset';
}

export interface EspnAddLeagueFormStateModel {
  sport: string | null;
  leagueId: string | null;
}

@State<EspnAddLeagueFormStateModel>({
  name: 'espnAddLeagueForm',
  defaults: {
    sport: null,
    leagueId: null,
  },
})
@Injectable()
export class EspnAddLeagueFormState {
  @Action(SetSportValue)
  setSportValue({ patchState }: StateContext<EspnAddLeagueFormStateModel>, { payload: { sport } }: SetSportValue): void {
    patchState({ sport });
  }

  @Action(SetLeagueIdValue)
  setLeagueIdValue({ patchState }: StateContext<EspnAddLeagueFormStateModel>, { payload: { leagueId } }: SetLeagueIdValue): void {
    patchState({ leagueId });
  }

  @Action(Reset)
  reset({ patchState }: StateContext<EspnAddLeagueFormStateModel>): void {
    patchState({ leagueId: null, sport: null });
  }
}
