import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { Action, State, StateContext } from '@ngxs/store';
import { FetchPlayers, PatchPlayers } from '../actions/daily-fantasy-players.actions';
import { PatchSchedule } from '../actions/daily-fantasy-schedule.actions';
import { PatchTeams } from '../actions/daily-fantasy-teams.actions';
import { SlatePlayer } from '../models/player.model';
import { PlayerService } from '../service/player.service';

@State({ name: 'dailyFantasyPlayers' })
@Injectable()
export class DailyFantasyPlayersState extends GenericState({
  idProperty: 'id',
  patchAction: PatchPlayers,
}) {
  constructor(private playerService: PlayerService) {
    super();
  }

  @Action(FetchPlayers)
  async fetchPlayers({ dispatch }: StateContext<GenericStateModel<SlatePlayer>>, { payload: { slatePath } }: FetchPlayers): Promise<void> {
    const { players, schedule, teams } = await this.playerService.playersBySlate({ slatePath }).toPromise();
    dispatch([new PatchPlayers(players), new PatchSchedule(schedule), new PatchTeams(teams)]);
  }
}
