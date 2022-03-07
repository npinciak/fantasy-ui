import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { FetchGridIronPlayers } from '../nfl/state/nfl-dfs-player-gridiron.state';
import { PatchProfiler } from '../nfl/state/nfl-dfs-profiler.state';
import { SlateService, SlateTeamMap } from '../service/slate.service';

export class FetchSlateAttr {
  public static readonly type = `[dailyFantasySlateAttr] FetchSlateAttr`;
  constructor(public payload: { sport: string; site: string; slateId: string }) {}
}

export class PatchSlateAttr {
  public static readonly type = `[dailyFantasySlateAttr] PatchSlateAttr`;
  constructor(public payload: {}) {}
}

export class DailyFantasySlateAttrStateModel {
  // slatePlayers: { [id: string]: NFLClientPlayerAttributes };
  teams: SlateTeamMap;
  players: Record<string, any>;
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
  static teamMap(state: DailyFantasySlateAttrStateModel): SlateTeamMap {
    return state.teams;
  }

  @Selector()
  static playerMap(state: DailyFantasySlateAttrStateModel): Record<string, any> {
    return state.players;
  }

  @Selector()
  static slate(state: DailyFantasySlateAttrStateModel): string {
    return state.slate;
  }

  @Action(FetchSlateAttr)
  async FetchSlateAttr(
    { patchState, dispatch }: StateContext<DailyFantasySlateAttrStateModel>,
    { payload: { sport, site, slateId } }: FetchSlateAttr
  ): Promise<void> {
    const { statGroups, teams, players } = await this.slateService.getGameAttrBySlateId({ sport, site, slateId }).toPromise();

    dispatch(new PatchProfiler({ profiler: statGroups }));

    if (sport === 'nfl') {
      dispatch([new FetchGridIronPlayers({ site })]);
    }

    // if (sport === 'nba') {
    //   dispatch([new PatchNbaTeamSlateAttr({ teams: res.teams })]);
    // }

    patchState({ teams: entityMap(teams), slate: slateId, players: entityMap(players) });
  }
}
