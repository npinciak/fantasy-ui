import { Injectable } from '@angular/core';
import { EspnService } from '@app/espn/espn.service';
import { State, Action, Selector, StateContext, Store } from '@ngxs/store';

import { FetchFootballLeague } from '../actions/nfl.actions';
import { NflService } from '../services/nfl.service';
import { PatchFantasyFootballSchedule } from './fantasy-football-schedule.state';
import { PatchFantasyFootballTeams } from './fantasy-football-teams.state';

interface FantasyFootballLeagueStateModel {
  seasonId: number | null;
  scoringPeriodId: number | null;
  isLoading: boolean;
}

@State<FantasyFootballLeagueStateModel>({
  name: 'fantasyFootballLeague',
  defaults: {
    seasonId: null,
    scoringPeriodId: null,
    isLoading: true,
  },
})
@Injectable()
export class FantasyFootballLeagueState {
  constructor(private espnService: EspnService, private nflService: NflService, private store: Store) {}

  @Selector()
  static scoringPeriod(state: FantasyFootballLeagueStateModel) {
    return state.scoringPeriodId;
  }

  @Action(FetchFootballLeague)
  async footballLeague(
    { getState, patchState, dispatch }: StateContext<FantasyFootballLeagueStateModel>,
    { leagueId }: FetchFootballLeague
  ) {
    const state = getState();

    const league = await this.nflService.footballLeague(Number(leagueId)).toPromise();

    const scoringPeriodId = league.scoringPeriodId;
    const seasonId = league.seasonId;
    const schedule = league.schedule;
    const teams = league.teams;

    dispatch([new PatchFantasyFootballSchedule({ schedule }), new PatchFantasyFootballTeams({ teams })]);
    patchState({ ...state, scoringPeriodId, seasonId });
  }
}
