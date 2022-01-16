import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { DfsSlate } from '../mlb/models/slateMaster.interface';
import { SlateAttrTeam } from '../models/team.model';
import { SlateService } from '../service/slate.service';

export class FetchSlateAttr {
  public static readonly type = `[dailyFantasySlateAttr] FetchSlateAttr`;
  constructor(public payload: { sport: string; site: string; slateId: string }) {}
}

export class DailyFantasySlateAttrStateModel {
  map: Record<number, DfsSlate>;
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
  static slates(state: DailyFantasySlateAttrStateModel): { [id: number]: DfsSlate } {
    return state.map;
  }

  @Action(FetchSlateAttr)
  async FetchSlateAttr(
    { patchState, dispatch }: StateContext<DailyFantasySlateAttrStateModel>,
    { payload: { sport, site, slateId } }: FetchSlateAttr
  ): Promise<void> {
    const res = await this.slateService.getGameAttrBySlateId(sport, site, slateId).toPromise();

    patchState({});
  }
}
