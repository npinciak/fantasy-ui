import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SlateAttrTeam } from '../models/team.model';
import { SlateService } from '../service/slate.service';
import { SlateMasterMap } from './daily-fantasy-slate.state';

export class FetchSlateAttr {
  public static readonly type = `[dailyFantasySlateAttr] FetchSlateAttr`;
  constructor(public payload: { sport: string; site: string; slateId: string }) {}
}

export class DailyFantasySlateAttrStateModel {
  map: SlateMasterMap;
  // slatePlayers: { [id: string]: NFLClientPlayerAttributes };
  teams: Record<string, SlateAttrTeam>;
  players: Record<string, any>;
}

const defaults = {
  map: {},
  teams: {},
  players: {},
};

@State<DailyFantasySlateAttrStateModel>({
  name: 'dailyFantasySlateAttr',
  defaults,
})
@Injectable()
export class DailyFantasySlateAttrState {
  constructor(private slateService: SlateService) {}

  @Selector()
  static slates(state: DailyFantasySlateAttrStateModel): SlateMasterMap {
    return state.map;
  }

  @Action(FetchSlateAttr)
  async FetchSlateAttr(
    { patchState, dispatch }: StateContext<DailyFantasySlateAttrStateModel>,
    { payload: { sport, site, slateId } }: FetchSlateAttr
  ): Promise<void> {
    const res = await this.slateService.getGameAttrBySlateId({sport, site, slateId}).toPromise();

    patchState({});
  }
}
