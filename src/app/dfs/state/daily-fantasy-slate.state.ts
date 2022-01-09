import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { DfsSlate } from '../mlb/models/slateMaster.interface';

import { SlateService } from '../service/slate.service';

export class FetchSlates {
  public static readonly type = `[dailyFantasySlate] FetchSlates`;
  constructor(public payload: { site: string; sport: string }) {}
}

export class DailyFantasySlateStateModel {
  slates: { [id: number]: DfsSlate };
}

const defaults = {
  slates: {},
};

@State<DailyFantasySlateStateModel>({
  name: 'dailyFantasySlate',
  defaults,
})
@Injectable()
export class DailyFantasySlateState {
  constructor(private slateService: SlateService) {}

  @Selector()
  static slates(state: DailyFantasySlateStateModel): { [id: number]: DfsSlate } {
    return state.slates;
  }

  @Action(FetchSlates)
  async fetchSlates({ patchState }: StateContext<DailyFantasySlateStateModel>, { payload: { site, sport } }: FetchSlates): Promise<void> {
    const res = await this.slateService.slatesByDate(sport).toPromise();
    const slates: { [id: number]: DfsSlate } = res[site];

    patchState({ slates });
  }
}
