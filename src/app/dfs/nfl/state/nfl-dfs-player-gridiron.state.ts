import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { PlayerService } from '@app/dfs/service/player.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GridIronPlayer, GridIronPlayerMap } from '../models/nfl-gridIron.model';

export class PatchGridIronPlayer {
  static readonly type = `[nflDfsPlayerGridIron] PatchGridIronPlayer`;
  constructor(public payload: { players: GridIronPlayer[] }) {}
}

export class FetchGridIronPlayers {
  static readonly type = `[nflDfsPlayerGridIron] FetchGridIronPlayers`;
  constructor(public payload: { site: string }) {}
}

export class NflDfsPlayerGridIronStateModel {
  map: GridIronPlayerMap;
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
  static getGridIronPlayerMap(state: NflDfsPlayerGridIronStateModel): GridIronPlayerMap {
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
  patchPlayerGridIron({ patchState }: StateContext<NflDfsPlayerGridIronStateModel>, { payload: { players } }: PatchGridIronPlayer): void {
    const map = entityMap(players, p => p.playerid.toString());
    patchState({ map });
  }
}
