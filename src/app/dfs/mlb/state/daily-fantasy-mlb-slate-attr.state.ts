import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ClearAndAddMlbPlayerSlateAttributes } from '../actions/daily-fantasy-mlb-player-slate-attr.actions';
import { MlbSlateService } from '../service/mlb-slate.service';

export class FetchSlateAttr {
  public static readonly type = `[dailyFantasySlateAttr] FetchSlateAttr`;
  constructor(public payload: { sport: string; site: string; slate: string }) {}
}

export class DailyFantasySlateAttrStateModel {
  slate: string | null;
  site: number | string | null;
}

const defaults = {
  slate: null,
  site: null,
};

@State<DailyFantasySlateAttrStateModel>({
  name: 'dailyFantasyMlbSlateAttr',
  defaults,
})
@Injectable()
export class DailyFantasyMlbSlateAttrState {
  constructor(private slateService: MlbSlateService) {}

  @Selector()
  static slate(state: DailyFantasySlateAttrStateModel): string | null {
    return state.slate;
  }

  @Action(FetchSlateAttr)
  async FetchSlateAttr(
    { setState, dispatch }: StateContext<DailyFantasySlateAttrStateModel>,
    { payload: { sport, site, slate } }: FetchSlateAttr
  ): Promise<void> {
    const { teams, players } = await this.slateService.getGameAttrBySlateId({ sport, site, slate }).toPromise();

    dispatch([new ClearAndAddMlbPlayerSlateAttributes(players)]);

    setState({ slate, site });
  }
}
