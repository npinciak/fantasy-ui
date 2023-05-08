import { Injectable } from '@angular/core';
import { exists } from '@app/@shared/utilities/utilities.m';
import { FantasyLeagueBaseStateModel } from '@app/espn/state/base-league.model';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { FantasyBaseballEvents } from '../actions/fantasy-baseball-events.actions';
import { FantasyBaseballLeague } from '../actions/fantasy-baseball-league.actions';
import { FantasyBaseballTeamsLive } from '../actions/fantasy-baseball-team-live.actions';
import { FantasyBaseballTeams } from '../actions/fantasy-baseball-team.actions';
import { FantasyBaseballLeagueSelector } from '../selectors/fantasy-baseball-league.selector';
import { MlbService } from '../services/mlb.service';

@State({ name: FantasyBaseballLeague.stateName + 'Actionhandler' })
@Injectable()
export class FantasyBaseballLeagueActionHandler {
  constructor(private mlbService: MlbService, private store: Store) {}

  @Action(FantasyBaseballLeague.Fetch)
  async baseballLeague(
    { setState }: StateContext<FantasyLeagueBaseStateModel>,
    { payload: { leagueId, year } } //: FantasyBaseballLeague.Fetch
  ): Promise<void> {
    if (!exists(leagueId)) throw new Error('LeagueId cannot be null');
    try {
      const { id, scoringPeriodId, matchupPeriodCount, firstScoringPeriod, finalScoringPeriod, seasonId, teams, teamsLive } =
        await this.mlbService.baseballLeague(leagueId, year).toPromise();

      const state = { id, scoringPeriodId, matchupPeriodCount, firstScoringPeriod, finalScoringPeriod, seasonId };
      this.store.dispatch([
        new FantasyBaseballEvents.Fetch(),
        new FantasyBaseballTeamsLive.AddOrUpdate(teamsLive),
        new FantasyBaseballTeams.AddOrUpdate(teams),
        new FantasyBaseballLeague.SetLeague({ state }),
      ]);
    } catch (e) {}
  }

  @Action(FantasyBaseballLeague.Refresh)
  refresh() {
    const leagueId = this.store.selectSnapshot(FantasyBaseballLeagueSelector.slices.id);
    const year = this.store.selectSnapshot(FantasyBaseballLeagueSelector.slices.seasonId);

    if (!exists(leagueId)) throw new Error('leagueId cannot be null');
    if (!exists(year)) throw new Error('year cannot be null');

    this.store.dispatch(new FantasyBaseballLeague.Fetch({ leagueId, year }));
  }
}
