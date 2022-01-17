import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Player, PlayerMap } from '../models/player.model';
import { PlayerService } from '../service/player.service';
import { PatchSchedule } from './daily-fantasy-schedule.state';
import { PatchTeams } from './daily-fantasy-team.state';

export class FetchPlayers {
  static readonly type = `[dailyFantasyPlayers] FetchPlayers`;
  constructor(public payload: { slatePath: string }) {}
}

export class PatchPlayers {
  static readonly type = `[dailyFantasyPlayers] PatchPlayers`;
  constructor(public payload: { players: Player[] }) {}
}

export class DailyFantasyPlayersStateModel {
  map: PlayerMap;
}

@State<DailyFantasyPlayersStateModel>({
  name: 'dailyFantasyPlayers',
  defaults: {
    map: {},
  },
})
@Injectable()
export class DailyFantasyPlayersState {
  constructor(private playerService: PlayerService) {}

  @Selector([DailyFantasyPlayersState])
  static getMap(state: DailyFantasyPlayersStateModel): PlayerMap {
    return state.map;
  }

  @Action(FetchPlayers)
  async fetchPlayers({ dispatch }: StateContext<DailyFantasyPlayersStateModel>, { payload: { slatePath } }: FetchPlayers): Promise<void> {
    const data = await this.playerService.playersBySlate({ slatePath }).toPromise();

    const players = data.players;
    const schedule = data.schedule;
    const teams = data.teams;

    dispatch([new PatchPlayers({ players }), new PatchSchedule({ schedule }), new PatchTeams({ teams })]);
  }

  @Action(PatchPlayers)
  patchPlayers({ getState, patchState }: StateContext<DailyFantasyPlayersStateModel>, { payload: { players } }: PatchPlayers) {
    const state = getState();
    const map = entityMap(players);

    patchState({ ...state, map });
  }
}
