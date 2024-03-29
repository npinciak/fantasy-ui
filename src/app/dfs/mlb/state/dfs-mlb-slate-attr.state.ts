import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { DfsMlbSlatePlayerActions } from '../actions/dfs-mlb-slate-player.actions';
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
  constructor(private slateService: MlbSlateService, private store: Store) {}

  @Selector()
  static slate(state: DailyFantasySlateAttrStateModel): string | null {
    return state.slate;
  }

  @Action(FetchSlateAttr)
  async FetchSlateAttr(
    { setState }: StateContext<DailyFantasySlateAttrStateModel>,
    { payload: { sport, site, slate } }: FetchSlateAttr
  ): Promise<void> {
    const { teams, players } = await firstValueFrom(this.slateService.getGameAttributesBySlateId({ sport, site, slateId: slate }));

    this.store.dispatch([new DfsMlbSlatePlayerActions.AddOrUpdate(players)]);

    setState({ slate, site });
  }
}
