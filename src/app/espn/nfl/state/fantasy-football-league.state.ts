import { Injectable } from '@angular/core';
import { Selector } from '@app/@shared/models/typed-selector';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { FantasyFootballLeague } from '../actions/fantasy-football-league.actions';
import { FantasyFootballSchedule } from '../actions/fantasy-football-schedule.actions';
import { FantasyFootballTeams } from '../actions/fantasy-football-teams.actions';
import { FantasyFootballTransaction } from '../actions/fantasy-football-transaction.actions';
import { FantasyFootballService } from '../services/fantasy-football.service';

export interface FantasyFootballLeagueStateModel {
  seasonId: number | null;
  currentScoringPeriodId: number | null;
  firstScoringPeriodId: number | null;
  finalScoringPeriodId: number | null;
  matchupPeriodCount: number | null;
  leagueId: string | null;
  isLoading: boolean;
  settings: any; // EspnClientLeagueSettings | null;
}

@State<FantasyFootballLeagueStateModel>({
  name: FantasyFootballLeague.name,
  defaults: {
    seasonId: null,
    currentScoringPeriodId: 1,
    firstScoringPeriodId: 1,
    finalScoringPeriodId: null,
    matchupPeriodCount: null,
    leagueId: null,
    isLoading: false,
    settings: {},
  },
})
@Injectable()
export class FantasyFootballLeagueState {
  @Selector([FantasyFootballLeagueState])
  static getState(state: FantasyFootballLeagueStateModel) {
    return state;
  }

  constructor(private nflService: FantasyFootballService, private store: Store) {}

  @Action(FantasyFootballLeague.Fetch)
  async footballLeague(
    { patchState }: StateContext<FantasyFootballLeagueStateModel>,
    { payload: { leagueId } }: FantasyFootballLeague.Fetch
  ) {
    patchState({ isLoading: true });

    const year = new Date().getFullYear().toString();

    const {
      currentScoringPeriodId,
      firstScoringPeriodId,
      finalScoringPeriodId,
      teams,
      matchupPeriodCount,
      schedule,
      settings,
      freeAgents,
      transactions,
    } = await this.nflService.footballLeague(leagueId, year).toPromise();

    await this.store
      .dispatch([
        new FantasyFootballTeams.AddOrUpdate(teams),
        new FantasyFootballSchedule.AddOrUpdate(schedule),
        new FantasyFootballLeague.SetCurrentScoringPeriodId({ currentScoringPeriodId }),
        new FantasyFootballTransaction.AddOrUpdate(transactions),
      ])
      .toPromise();
    patchState({ firstScoringPeriodId, finalScoringPeriodId, matchupPeriodCount, settings, leagueId, isLoading: false });
  }

  @Action(FantasyFootballLeague.SetCurrentScoringPeriodId)
  setCurrentScoringPeriodId(
    { patchState }: StateContext<FantasyFootballLeagueStateModel>,
    { payload: { currentScoringPeriodId } }: FantasyFootballLeague.SetCurrentScoringPeriodId
  ) {
    patchState({ currentScoringPeriodId });
  }
}
