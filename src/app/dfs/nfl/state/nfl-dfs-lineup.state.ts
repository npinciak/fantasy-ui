import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Slot } from '../../mlb/models/slateSettings.interface';
import { NFLPlayerTableRow } from '../models/nfl-player-table-row.model';
import { AddPlayer, RemovePlayer } from './nfl-dfs-lineup.actions';

export class NflDfsLineupStateModel {
  // salary: number;
  lineup: { [slot: string]: NFLPlayerTableRow };
  positions: { [slot: string]: Slot };
}

const defaults = {
  // salary: null,
  lineup: {},
  positions: {},
};

@State<NflDfsLineupStateModel>({
  name: 'nflDfsLineup',
  defaults,
})
@Injectable()
export class NflDfsLineupState {
  constructor() {}

  @Action(AddPlayer)
  addPlayer(ctx: StateContext<NflDfsLineupStateModel>, { payload }: AddPlayer) {
    // const player = {};

    const lineup = {
      [payload.player.position]: payload.player,
    };

    ctx.patchState({
      lineup: { ...lineup },
    });
  }

  @Action(RemovePlayer)
  removePlayer(ctx: StateContext<NflDfsLineupStateModel>, { payload }: RemovePlayer) {
    ctx.patchState({});
  }
}
