import { Injectable } from '@angular/core';
import { RouterSelector } from '@app/@core/store/router/router.selectors';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { SetMlbPlayerSlateAttributes } from '../mlb/actions/daily-fantasy-mlb-player-slate-attr.actions';
import { SetMlbTeamSlateAttributes } from '../mlb/actions/daily-fantasy-mlb-team-slate-attr.actions';
import { PlayerSlateAttr } from '../models/player-slate-attr.model';
import { FetchGridIronPlayers } from '../nfl/actions/daily-fantasy-nfl-grid-iron.actions';
import { SetNflPlayerSlateAttributes } from '../nfl/actions/daily-fantasy-nfl-players-slate-attr.actions';
import { ClearAndAddNflProfilerQB } from '../nfl/actions/daily-fantasy-nfl-profiler-qb.actions';
import { ClearAndAddNflProfilerRB } from '../nfl/actions/daily-fantasy-nfl-profiler-rb.actions';
import { ClearAndAddNflProfilerTE } from '../nfl/actions/daily-fantasy-nfl-profiler-te.actions';
import { ClearAndAddNflProfilerWR } from '../nfl/actions/daily-fantasy-nfl-profiler-wr.actions';
import { SetNflTeamSlateAttributes } from '../nfl/actions/daily-fantasy-nfl-team-slate-attr.actions';

import { SlateService, SlateTeamMap } from '../service/slate.service';

export class FetchSlateAttr {
  public static readonly type = `[dailyFantasySlateAttr] FetchSlateAttr`;
  constructor(public payload: { slate: string }) {}
}

export class DailyFantasySlateAttrStateModel {
  teams: SlateTeamMap;
  players: Record<string, PlayerSlateAttr>;
  slate: string | null;
  site: number | string | null;
}

const defaults = {
  teams: {},
  players: {},
  slate: null,
  site: null,
};

@State<DailyFantasySlateAttrStateModel>({
  name: 'dailyFantasySlateAttr',
  defaults,
})
@Injectable()
export class DailyFantasySlateAttrState {
  constructor(private store: Store, private slateService: SlateService) {}

  @Selector()
  static slate(state: DailyFantasySlateAttrStateModel): string | null {
    return state.slate;
  }

  @Action(FetchSlateAttr)
  async FetchSlateAttr(
    { patchState, dispatch }: StateContext<DailyFantasySlateAttrStateModel>,
    { payload: { slate } }: FetchSlateAttr
  ): Promise<void> {
    const queryParams = this.store.selectSnapshot(RouterSelector.getRouterQueryParams);

    const sport = queryParams?.sport;
    const site = queryParams?.site;

    const { statGroups, teams, players } = await this.slateService.getGameAttrBySlateId({ sport, site, slate }).toPromise();
    // const { qb, rb, wr, te } = statGroups;
    // console.log({ statGroups });

    switch (sport) {
      case 'mlb':
        dispatch([new SetMlbPlayerSlateAttributes(players), new SetMlbTeamSlateAttributes(teams)]);

        break;
      case 'nfl':
        // await dispatch([new ClearNflPlayerSlateAttributes()]).toPromise();

        await dispatch([
          new SetNflPlayerSlateAttributes(players),
          new SetNflTeamSlateAttributes(teams),
          new ClearAndAddNflProfilerQB([]),
          new ClearAndAddNflProfilerRB([]),
          new ClearAndAddNflProfilerWR([]),
          new ClearAndAddNflProfilerTE([]),
          new FetchGridIronPlayers({ site }),
        ]).toPromise();
        break;
      case 'nba':
        // dispatch([new PatchNbaTeamSlateAttr({ teams })]);
        break;

      default:
        break;
    }

    patchState({ slate });
  }
}
