import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { DfsSlate } from '../mlb/models/slateMaster.interface';
import { SlateService } from '../service/slate.service';

export class FetchSlates {
  public static readonly type = `[dailyFantasySlate] FetchSlates`;
  constructor(public payload: { site: string; sport: string }) {}
}

export class DailyFantasySlateStateModel {
  map: { [id: number]: DfsSlate };
}

const defaults = {
  map: {},
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
    return state.map;
  }

  @Action(FetchSlates)
  async fetchSlates({ patchState }: StateContext<DailyFantasySlateStateModel>, { payload: { site, sport } }: FetchSlates): Promise<void> {
    const res = await this.slateService.slatesByDate(sport).toPromise();
    const map: { [id: number]: DfsSlate } = res[site];

    patchState({ map });
  }
}
