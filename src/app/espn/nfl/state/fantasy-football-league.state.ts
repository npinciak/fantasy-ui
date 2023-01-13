import { Injectable } from '@angular/core';
import { exists } from '@app/@shared/helpers/utils';
import { FantasyLeagueBaseState, FantasyLeagueBaseStateModel } from '@app/espn/state/base-league.state';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { FantasyFootballLeague } from '../actions/fantasy-football-league.actions';
import { FantasyFootballSchedule } from '../actions/fantasy-football-schedule.actions';
import { FantasyFootballTeams } from '../actions/fantasy-football-teams.actions';
import { FantasyFootballLeagueSelectors } from '../selectors/fantasy-football-league.selectors';
import { FantasyFootballService } from '../services/fantasy-football.service';

@State({
  name: FantasyFootballLeague.name,
})
@Injectable()
export class FantasyFootballLeagueState extends FantasyLeagueBaseState({}) {
  constructor(private nflService: FantasyFootballService, private store: Store) {
    super();
  }

  @Action(FantasyFootballLeague.Fetch)
  async footballLeague(
    { patchState }: StateContext<FantasyLeagueBaseStateModel>,
    { payload: { leagueId, year } }: FantasyFootballLeague.Fetch
  ) {
    patchState({ isLoading: true });

    try {
      const { id, seasonId, scoringPeriodId, firstScoringPeriod, finalScoringPeriod, teams, matchupPeriodCount, schedule } =
        await this.nflService.fetchLeague(leagueId, year).toPromise();

      await this.store
        .dispatch([new FantasyFootballTeams.AddOrUpdate(teams), new FantasyFootballSchedule.AddOrUpdate(schedule)])
        .toPromise();

      patchState({
        seasonId,
        firstScoringPeriod,
        finalScoringPeriod,
        scoringPeriodId,
        matchupPeriodCount,
        id,
        isLoading: false,
      });
    } catch (error) {}
  }

  @Action(FantasyFootballLeague.Refresh)
  async refresh() {
    const leagueId = this.store.selectSnapshot(FantasyFootballLeagueSelectors.getLeagueId);
    const year = this.store.selectSnapshot(FantasyFootballLeagueSelectors.getSeasonId);

    if (!exists(leagueId)) throw new Error('leagueId cannot be null');
    if (!exists(year)) throw new Error('year cannot be null');

    this.store.dispatch(new FantasyFootballLeague.Fetch({ leagueId, year }));
  }

  @Action(FantasyFootballLeague.SetCurrentScoringPeriodId)
  setCurrentScoringPeriodId(
    { patchState }: StateContext<FantasyLeagueBaseStateModel>,
    { payload: { scoringPeriodId } }: FantasyFootballLeague.SetCurrentScoringPeriodId
  ) {
    patchState({ scoringPeriodId });
  }
}
