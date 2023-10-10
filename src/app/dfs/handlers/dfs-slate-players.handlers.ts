import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { Action, State, StateContext } from '@ngxs/store';
import { DfsSlatePlayersActions } from '../actions/dfs-slate-players.actions';
import { DfsMatchupsFacade } from '../facade/dfs-matchups.facade';
import { DfsSlatePlayersFacade } from '../facade/dfs-slate-players.facade';
import { DfsTeamsFacade } from '../facade/dfs-teams.facade';
import { SlatePlayer } from '../models/player.model';
import { PlayerService } from '../service/player.service';

@State({ name: DfsSlatePlayersActions.stateName + 'ActionHandler' })
@Injectable()
export class DfsSlatePlayersHandlerState {
  constructor(
    private playerService: PlayerService,
    private dfsTeamsFacade: DfsTeamsFacade,
    private dfsMatchupsFacade: DfsMatchupsFacade,
    private dfsSlatePlayersFacade: DfsSlatePlayersFacade
  ) {}

  @Action(DfsSlatePlayersActions.Fetch)
  async fetchPlayers(
    _: StateContext<GenericStateModel<SlatePlayer>>,
    { payload: { slatePath } }: { payload: { slatePath: string } }
  ): Promise<void> {
    const { players, schedule, teams } = await this.playerService.getPlayersBySlate({ slatePath }).toPromise();

    await this.dfsSlatePlayersFacade.clear().toPromise();
    await this.dfsMatchupsFacade.clear().toPromise();
    await this.dfsTeamsFacade.clear().toPromise();

    await Promise.all([
      this.dfsSlatePlayersFacade.addOrUpdate(players).toPromise(),
      this.dfsMatchupsFacade.addOrUpdate(schedule).toPromise(),
      this.dfsTeamsFacade.addOrUpdate(teams).toPromise(),
    ]);
  }
}
