import { Injectable } from '@angular/core';
import { entityMap } from '@app/@shared/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Player, PlayerMap } from '../models/player.model';
import { Schedule } from '../models/schedule.model';
import { Team } from '../models/team.model';
import { DfsUrlBuilder } from '../nfl/class/url-builder.class';
import { PlayerService } from '../service/player.service';
import { PatchSchedule } from './daily-fantasy-schedule.state';
import { PatchTeams } from './daily-fantasy-team.state';

export class FetchPlayers {
  static readonly type = `[dailyFantasyPlayers] FetchPlayers`;
  constructor(public payload: { slatePath: string; league: string }) {}
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
  async fetchPlayers(
    { dispatch }: StateContext<DailyFantasyPlayersStateModel>,
    { payload: { slatePath, league } }: FetchPlayers
  ): Promise<void> {
    const urlBuilder = new DfsUrlBuilder(league);

    const original = urlBuilder.slateNonHttps;
    const newHttps = urlBuilder.slateHttps;

    const data = await this.playerService.playersBySlate(slatePath.replace(original, newHttps)).toPromise();

    const players = data.map(p => p.player);
    const games = data.map(p => p.game);

    const map = new Map<string, Schedule>(); // TODO: move to service

    games.map(p => {
      if (map.has(p.id)) {
        return;
      } else {
        map.set(p.id, p);
      }
    }); // TODO: move to service

    const schedule = Array.from(map, ([key, value]) => ({ ...value })); // TODO: move to service

    const teams: Team[] = []; // TODO: move to service

    schedule.map(s => {
      teams.push(s.awayTeam, s.homeTeam); // TODO: move to service
    });

    dispatch([new PatchPlayers({ players }), new PatchSchedule({ schedule }), new PatchTeams({ teams })]);
  }

  @Action(PatchPlayers)
  patchPlayers({ getState, patchState }: StateContext<DailyFantasyPlayersStateModel>, { payload: { players } }: PatchPlayers) {
    const state = getState();
    const map = entityMap(players);

    patchState({ ...state, map });
  }
}
