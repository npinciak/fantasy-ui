import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { PlayerService } from '@app/dfs/service/player.service';
import { Action, State, StateContext } from '@ngxs/store';
import { ClearAndAddGridIronPlayer, FetchGridIronPlayers, name, PatchGridIronPlayer } from '../actions/daily-fantasy-nfl-grid-iron.actions';
import { GridIronPlayer } from '../models/nfl-gridIron.model';

@State({ name })
@Injectable()
export class DailyFantasyNflGridIronState extends GenericState({
  idProperty: 'playerId',
  addOrUpdate: PatchGridIronPlayer,
  clearAndAdd: ClearAndAddGridIronPlayer,
}) {
  constructor(private playerService: PlayerService) {
    super();
  }

  @Action(FetchGridIronPlayers)
  async fetchGridIronPlayers(
    { dispatch }: StateContext<GenericStateModel<GridIronPlayer>>,
    { payload: { site } }: FetchGridIronPlayers
  ): Promise<void> {
    const players = await this.playerService.getGridIronPlayers({ site }).toPromise();
    dispatch([new ClearAndAddGridIronPlayer(players)]);
  }
}
