import { Injectable } from '@angular/core';
import { GenericStateModel } from '@app/@shared/generic-state/generic.model';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { ClearAndAddPlayers, FetchPlayers, SetPlayers } from '../actions/daily-fantasy-players.actions';
import { ClearAndAddSchedule } from '../actions/daily-fantasy-schedule.actions';
import { ClearAndAddTeams } from '../actions/daily-fantasy-teams.actions';
import { SlatePlayer } from '../models/player.model';
import { PlayerService } from '../service/player.service';

@State({ name: 'dailyFantasyPlayers' })
@Injectable()
export class DailyFantasyPlayersState extends GenericState({
  idProperty: 'id',
  addOrUpdate: SetPlayers,
  clearAndAdd: ClearAndAddPlayers,
}) {
  constructor(private playerService: PlayerService, private store: Store) {
    super();
  }

  @Action(FetchPlayers)
  async fetchPlayers({}: StateContext<GenericStateModel<SlatePlayer>>, { payload: { slatePath } }: FetchPlayers): Promise<void> {
    const { players, schedule, teams } = await this.playerService.playersBySlate({ slatePath }).toPromise();
    this.store.dispatch([new ClearAndAddPlayers(players), new ClearAndAddSchedule(schedule), new ClearAndAddTeams(teams)]);
  }
}
