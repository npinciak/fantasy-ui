import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { DfsMatchups } from '../actions/dfs-matchup.actions';
import { DfsSlatePlayers } from '../actions/dfs-players.actions';
import { DfsTeams } from '../actions/dfs-teams.actions';
import { SlatePlayer } from '../models/player.model';
import { PlayerService } from '../service/player.service';

@State({ name: DfsSlatePlayers.stateName })
@Injectable()
export class DfsSlatePlayersState extends GenericState({
  idProperty: 'id',
  addOrUpdate: DfsSlatePlayers.AddOrUpdate,
  clearAndAdd: DfsSlatePlayers.ClearAndAdd,
}) {
  constructor(private playerService: PlayerService, private store: Store) {
    super();
  }

  @Action(DfsSlatePlayers.Fetch)
  async fetchPlayers({}: StateContext<GenericStateModel<SlatePlayer>>, { payload }: { payload: { slatePath: string } }): Promise<void> {
    const { slatePath } = payload;
    const { players, schedule, teams } = await this.playerService.playersBySlate({ slatePath }).toPromise();
    this.store.dispatch([new DfsSlatePlayers.ClearAndAdd(players), new DfsMatchups.ClearAndAdd(schedule), new DfsTeams.ClearAndAdd(teams)]);
  }
}
