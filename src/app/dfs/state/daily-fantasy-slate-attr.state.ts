import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetMlbPlayerSlateAttributes } from '../mlb/actions/daily-fantasy-mlb-player-slate-attr.actions';
import { SetMlbTeamSlateAttributes } from '../mlb/actions/daily-fantasy-mlb-team-slate-attr.actions';
import { PlayerSlateAttr } from '../models/player-slate-attr.model';
import { SlateService, SlateTeamMap } from '../service/slate.service';

export class FetchSlateAttr {
  public static readonly type = `[dailyFantasySlateAttr] FetchSlateAttr`;
  constructor(public payload: { sport: string; site: string; slate: string }) {}
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
  constructor(private slateService: SlateService) {}

  @Selector()
  static slate(state: DailyFantasySlateAttrStateModel): string | null {
    return state.slate;
  }

  @Action(FetchSlateAttr)
  async FetchSlateAttr(
    { patchState, dispatch }: StateContext<DailyFantasySlateAttrStateModel>,
    { payload: { sport, site, slate } }: FetchSlateAttr
  ): Promise<void> {
    const { statGroups, teams, players } = await this.slateService.getGameAttrBySlateId({ sport, site, slate }).toPromise();

    dispatch([new SetMlbPlayerSlateAttributes(players), new SetMlbTeamSlateAttributes(teams)]);
    // dispatch(new PatchProfiler({ profiler: statGroups }));

    // if (sport === 'nfl') {
    //   dispatch([new FetchGridIronPlayers({ site })]);
    // }

    // if (sport === 'nba') {
    //   dispatch([new PatchNbaTeamSlateAttr({ teams: res.teams })]);
    // }

    patchState({ slate });
  }
}
