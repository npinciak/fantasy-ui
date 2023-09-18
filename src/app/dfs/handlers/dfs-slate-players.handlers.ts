import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { DfsMatchups } from '../actions/dfs-matchup.actions';
import { DfsSlatePlayers } from '../actions/dfs-slate-players.actions';
import { DfsTeams } from '../actions/dfs-teams.actions';
import { DfsSlatePlayersFacade } from '../facade/dfs-slate-players.facade';
import { SlatePlayer } from '../models/player.model';
import { PlayerService } from '../service/player.service';

@State({ name: DfsSlatePlayers.stateName + 'ActionHandler' })
@Injectable()
export class DfsSlatePlayersHandlerState {
  constructor(private playerService: PlayerService, private store: Store, private dfsSlatePlayersFacade: DfsSlatePlayersFacade) {}

  @Action(DfsSlatePlayers.Fetch)
  async fetchPlayers(_: StateContext<GenericStateModel<SlatePlayer>>, { payload }: { payload: { slatePath: string } }): Promise<void> {
    const { slatePath } = payload;
    const { players, schedule, teams } = await this.playerService.playersBySlate({ slatePath }).toPromise();

    this.dfsSlatePlayersFacade.clear();
    this.dfsSlatePlayersFacade.addOrUpdate(players);

    this.store.dispatch([new DfsMatchups.AddOrUpdate(schedule), new DfsTeams.AddOrUpdate(teams)]);
  }
}
