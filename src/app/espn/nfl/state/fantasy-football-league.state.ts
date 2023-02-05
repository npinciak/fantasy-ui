import { Injectable } from '@angular/core';
import { exists } from '@app/@shared/utilities/utilities.m';
import { FantasyLeagueBaseStateModel } from '@app/espn/state/base-league.model';
import { FantasyLeagueBaseState } from '@app/espn/state/base-league.state';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { FantasyFootballLeague } from '../actions/fantasy-football-league.actions';
import { FantasyFootballSchedule } from '../actions/fantasy-football-schedule.actions';
import { FantasyFootballTeams } from '../actions/fantasy-football-teams.actions';
import { FantasyFootballLeagueSelector } from '../selectors/fantasy-football-league.selectors';
import { FantasyFootballService } from '../services/fantasy-football.service';

@State({ name: FantasyFootballLeague.stateName })
@Injectable()
export class FantasyFootballLeagueState extends FantasyLeagueBaseState() {
  constructor(private nflService: FantasyFootballService, private store: Store) {
    super();
  }

  @Action(FantasyFootballLeague.Fetch)
  async footballLeague(
    { setState }: StateContext<FantasyLeagueBaseStateModel>,
    { payload: { leagueId, year } }: FantasyFootballLeague.Fetch
  ) {
    try {
      const { id, seasonId, scoringPeriodId, firstScoringPeriod, finalScoringPeriod, teams, matchupPeriodCount, schedule } =
        await this.nflService.fetchLeague(leagueId, year).toPromise();

      await this.store
        .dispatch([new FantasyFootballTeams.ClearAndAdd(teams), new FantasyFootballSchedule.ClearAndAdd(schedule)])
        .toPromise();

      setState({
        seasonId,
        firstScoringPeriod,
        finalScoringPeriod,
        scoringPeriodId,
        matchupPeriodCount,
        id,
      });
    } catch (error) {}
  }

  @Action(FantasyFootballLeague.Refresh)
  refresh() {
    const leagueId = this.store.selectSnapshot(FantasyFootballLeagueSelector.getLeagueId);
    const year = this.store.selectSnapshot(FantasyFootballLeagueSelector.getSeasonId);

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
