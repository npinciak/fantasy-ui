import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { FetchFootballLeague } from '../actions/fantasy-football-league.actions';
import { SetFantasyFootballTeams } from '../actions/fantasy-football-teams.actions';
import { NflService } from '../services/nfl.service';
import { PatchFantasyFootballSchedule } from './fantasy-football-schedule.state';

export interface FantasyFootballLeagueStateModel {
  seasonId: number | null;
  scoringPeriodId: number | null;
}

@State<FantasyFootballLeagueStateModel>({
  name: 'fantasyFootballLeague',
  defaults: {
    seasonId: null,
    scoringPeriodId: null,
  },
})
@Injectable()
export class FantasyFootballLeagueState {
  constructor(private nflService: NflService, private store: Store) {}

  @Action(FetchFootballLeague)
  async footballLeague(
    { getState, patchState, dispatch }: StateContext<FantasyFootballLeagueStateModel>,
    { payload: { leagueId } }: FetchFootballLeague
  ) {
    const state = getState();

    const year = '2021'; //new Date().getFullYear().toString();

    const league = await this.nflService.footballLeague(leagueId, year).toPromise();

    const scoringPeriodId = league.scoringPeriodId;
    const seasonId = league.seasonId;
    const schedule = league.schedule;
    const teams = league.teams;

    dispatch([new PatchFantasyFootballSchedule({ schedule }), new SetFantasyFootballTeams(teams)]);
    patchState({ ...state, scoringPeriodId, seasonId });
  }
}
