import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { PlayerService } from '@app/dfs/service/player.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NFLClientGridIronPlayer } from '../models/nfl-client.model';

export class PatchGridIronPlayer {
  static readonly type = `[nflDfsPlayerGridIron] PatchGridIronPlayer`;
  constructor(public payload: { players: NFLClientGridIronPlayer[] }) {}
}

export class FetchGridIronPlayers {
  static readonly type = `[nflDfsPlayerGridIron] FetchGridIronPlayers`;
  constructor(public payload: { site: string }) {}
}

type NflDfsPlayerGridIronPlayerMap = Record<string, NFLClientGridIronPlayer>;

export class NflDfsPlayerGridIronStateModel {
  map: NflDfsPlayerGridIronPlayerMap;
}

const defaults = {
  map: {},
};

@State<NflDfsPlayerGridIronStateModel>({
  name: 'nflDfsPlayerGridIron',
  defaults,
})
@Injectable()
export class NflDfsPlayerGridIronState {
  @Selector([NflDfsPlayerGridIronState])
  static getGridIronPlayerMap(state: NflDfsPlayerGridIronStateModel): NflDfsPlayerGridIronPlayerMap {
    return state.map;
  }

  constructor(private playerService: PlayerService) {}

  @Action(FetchGridIronPlayers)
  async fetchGridIronPlayers(
    { dispatch }: StateContext<NflDfsPlayerGridIronStateModel>,
    { payload: { site } }: FetchGridIronPlayers
  ): Promise<void> {
    const players = await this.playerService.getGridIronPlayers({ site }).toPromise();
    dispatch([new PatchGridIronPlayer({ players })]);
  }

  @Action(PatchGridIronPlayer)
  patchPlayerGridIron({ patchState }: StateContext<NflDfsPlayerGridIronStateModel>, { payload: { players } }: PatchGridIronPlayer) {
    const map = entityMap(players, p => p.PLAYERID);
    patchState({ map });
  }
}
