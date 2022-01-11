import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { Player } from '../models/player.model';
import { Schedule } from '../models/schedule.model';
import { DfsUrlBuilder } from '../nfl/class/url-builder.class';
import { PlayerService } from '../service/player.service';
import { PatchSchedule } from './daily-fantasy-schedule.state';

export class FetchPlayers {
  static readonly type = `[dailyFantasyPlayers] FetchPlayers`;
  constructor(public payload: { slatePath: string; league: string }) {}
}

export class PatchPlayers {
  static readonly type = `[dailyFantasyPlayers] PatchPlayers`;
  constructor(public payload: { players: Player[] }) {}
}

export class DailyFantasyPlayersStateModel {
  map: { [id: string]: Player };
}

@State<DailyFantasyPlayersStateModel>({
  name: 'dailyFantasyPlayers',
  defaults: {
    map: {},
  },
})
@Injectable()
export class DailyFantasyPlayersState {
  constructor(private playerService: PlayerService) {}

  @Selector([DailyFantasyPlayersState])
  static getMap(state: DailyFantasyPlayersStateModel): { [id: string]: Player } {
    return state.map;
  }

  @Action(FetchPlayers)
  async fetchPlayers(
    { dispatch }: StateContext<DailyFantasyPlayersStateModel>,
    { payload: { slatePath, league } }: FetchPlayers
  ): Promise<void> {
    const urlBuilder = new DfsUrlBuilder(league);

    const original = urlBuilder.slateNonHttps;
    const newHttps = urlBuilder.slateHttps;

    const data = await this.playerService.playersBySlate(slatePath.replace(original, newHttps)).toPromise();
    const players = data.map(p => p.player);

    const games = data.map(p => p.game);
    const map = new Map<string, Schedule>();

    games.map(p => {
      if (map.has(p.id)) {
        return;
      } else {
        map.set(p.id, p);
      }
    });

    const schedule = Array.from(map, ([key, value]) => ({ ...value }));

    dispatch([new PatchPlayers({ players }), new PatchSchedule({ schedule })]);
  }

  @Action(PatchPlayers)
  patchPlayers({ getState, patchState }: StateContext<DailyFantasyPlayersStateModel>, { payload: { players } }: PatchPlayers) {
    const state = getState();
    const map = entityMap(players);

    patchState({ ...state, map });
  }
}
