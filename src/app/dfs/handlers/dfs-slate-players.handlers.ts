import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { DfsSlatePlayers } from '../actions/dfs-slate-players.actions';
import { DfsTeams } from '../actions/dfs-teams.actions';
import { DfsMatchupsFacade } from '../facade/dfs-matchups.facade';
import { DfsSlatePlayersFacade } from '../facade/dfs-slate-players.facade';
import { SlatePlayer } from '../models/player.model';
import { PlayerService } from '../service/player.service';

@State({ name: DfsSlatePlayers.stateName + 'ActionHandler' })
@Injectable()
export class DfsSlatePlayersHandlerState {
  constructor(
    private playerService: PlayerService,
    private store: Store,
    private dfsMatchupsFacade: DfsMatchupsFacade,
    private dfsSlatePlayersFacade: DfsSlatePlayersFacade
  ) {}

  @Action(DfsSlatePlayers.Fetch)
  async fetchPlayers(_: StateContext<GenericStateModel<SlatePlayer>>, { payload }: { payload: { slatePath: string } }): Promise<void> {
    const { slatePath } = payload;
    const { players, schedule, teams } = await this.playerService.playersBySlate({ slatePath }).toPromise();

    this.dfsSlatePlayersFacade.clear().toPromise();

    await Promise.all([
      this.dfsSlatePlayersFacade.addOrUpdate(players).toPromise(),
      this.dfsMatchupsFacade.addOrUpdate(schedule).toPromise(),
    ]);

    this.store.dispatch([new DfsTeams.AddOrUpdate(teams)]).toPromise();
  }
}
