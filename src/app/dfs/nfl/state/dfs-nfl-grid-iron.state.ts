import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { PlayerService } from '@app/dfs/service/player.service';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { DfsNflGridIron } from '../actions/dfs-nfl-grid-iron.actions';
import { GridIronPlayer } from '../models/nfl-gridIron.model';

@State({ name: DfsNflGridIron.stateName })
@Injectable()
export class DfsNflGridIronState extends GenericState({
  idProperty: 'playerId',
  actionHandler: DfsNflGridIron,
}) {
  constructor(private playerService: PlayerService, private store: Store) {
    super();
  }

  @Action(DfsNflGridIron.Fetch)
  async fetchGridIronPlayers(
    _: StateContext<GenericStateModel<GridIronPlayer>>,
    { payload }: { payload: { site: string } }
  ): Promise<void> {
    const { site } = payload;
    const players = await this.playerService.getGridIronPlayers({ site }).toPromise();
    this.store.dispatch([new DfsNflGridIron.ClearAndAdd(players)]);
  }
}
