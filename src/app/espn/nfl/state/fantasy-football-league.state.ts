import { Injectable } from '@angular/core';
import { exists } from '@app/@shared/helpers/utils';
import { Selector } from '@app/@shared/models/typed-selector';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { FantasyFootballLeague } from '../actions/fantasy-football-league.actions';
import { FantasyFootballSchedule } from '../actions/fantasy-football-schedule.actions';
import { FantasyFootballTeams } from '../actions/fantasy-football-teams.actions';
import { FantasyFootballTransaction } from '../actions/fantasy-football-transaction.actions';
import { FantasyFootballLeagueStateModel, INITIAL_STATE } from '../models/football-league-state.model';
import { FantasyFootballLeagueSelectors } from '../selectors/fantasy-football-league.selectors';
import { FantasyFootballService } from '../services/fantasy-football.service';

@State<FantasyFootballLeagueStateModel>({
  name: FantasyFootballLeague.name,
  defaults: INITIAL_STATE,
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
      scoringPeriodId,
      firstScoringPeriod,
      finalScoringPeriod,
      teams,
      matchupPeriodCount,
      playoffMatchupPeriodLength,
      schedule,
      transactions,
    } = await this.nflService.fetchLeague(leagueId, year).toPromise();

    await this.store
      .dispatch([
        new FantasyFootballTeams.AddOrUpdate(teams),
        new FantasyFootballSchedule.AddOrUpdate(schedule),
        new FantasyFootballTransaction.AddOrUpdate(transactions),
      ])
      .toPromise();

    patchState({
      firstScoringPeriod,
      finalScoringPeriod,
      scoringPeriodId,
      matchupPeriodCount,
      playoffMatchupPeriodLength,
      leagueId,
      isLoading: false,
    });
  }

  @Action(FantasyFootballLeague.Refresh)
  async refresh() {
    const leagueId = this.store.selectSnapshot(FantasyFootballLeagueSelectors.getLeagueId);

    if (exists(leagueId)) {
      this.store.dispatch(new FantasyFootballLeague.Fetch({ leagueId }));
    }
  }

  @Action(FantasyFootballLeague.SetCurrentScoringPeriodId)
  setCurrentScoringPeriodId(
    { patchState }: StateContext<FantasyFootballLeagueStateModel>,
    { payload: { scoringPeriodId } }: FantasyFootballLeague.SetCurrentScoringPeriodId
  ) {
    patchState({ scoringPeriodId });
  }
}
