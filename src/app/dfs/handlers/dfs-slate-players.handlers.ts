import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { Action, State, StateContext } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
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
    const { players, schedule, teams } = await firstValueFrom(this.playerService.getPlayersBySlate({ slatePath }));

    await firstValueFrom(this.dfsSlatePlayersFacade.clear());
    await firstValueFrom(this.dfsMatchupsFacade.clear());
    await firstValueFrom(this.dfsTeamsFacade.clear());

    await Promise.all([
      firstValueFrom(this.dfsSlatePlayersFacade.addOrUpdate(players)),
      firstValueFrom(this.dfsMatchupsFacade.addOrUpdate(schedule)),
      firstValueFrom(this.dfsTeamsFacade.addOrUpdate(teams)),
    ]);
  }
}
