import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SlateMaster } from '../models/daily-fantasy-client.model';
import { SlateService } from '../service/slate.service';

export type SlateMasterMap = Record<string, SlateMaster>;
export class FetchSlates {
  public static readonly type = `[dailyFantasySlate] FetchSlates`;
  constructor(public payload: { site: string; sport: string }) {}
}

export class DailyFantasySlateStateModel {
  map: SlateMasterMap;
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
  static slateMap(state: DailyFantasySlateStateModel): SlateMasterMap {
    return state.map;
  }

  @Action(FetchSlates)
  async fetchSlates({ patchState }: StateContext<DailyFantasySlateStateModel>, { payload: { site, sport } }: FetchSlates): Promise<void> {
    const res = await this.slateService.slatesByDate({ sport }).toPromise();
    const map: SlateMasterMap = res[site];

    patchState({ map });
  }
}
