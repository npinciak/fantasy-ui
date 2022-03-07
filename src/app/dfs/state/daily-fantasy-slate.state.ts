import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SlateMasterMap } from '../models/daily-fantasy-client.model';
import { SlateService } from '../service/slate.service';

export class FetchSlates {
  public static readonly type = `[dailyFantasySlate] FetchSlates`;
  constructor(public payload: { site: string; sport: string }) {}
}

export class DailyFantasySlateStateModel {
  map: SlateMasterMap;
  site: string | null;
}

const defaults = {
  map: {
    draftkings: {},
    fanduel: {},
    yahoo: {},
    superdraft: {},
  },
  site: null,
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

  @Selector()
  static site(state: DailyFantasySlateStateModel): string {
    return state.site;
  }

  @Action(FetchSlates)
  async fetchSlates({ patchState }: StateContext<DailyFantasySlateStateModel>, { payload: { site, sport } }: FetchSlates): Promise<void> {
    const map = await this.slateService.slatesByDate({ sport }).toPromise();

    // const map: SlateMasterMap = res[site];

    patchState({ map, site });
  }
}
