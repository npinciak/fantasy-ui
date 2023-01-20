import { Injectable } from '@angular/core';
import { exists } from '@app/@shared/helpers/utils';
import { FantasyLeagueBaseStateModel } from '@app/espn/state/base-league.model';
import { FantasyLeagueBaseState } from '@app/espn/state/base-league.state';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { FantasyBaseballEvents } from '../actions/fantasy-baseball-events.actions';
import { FantasyBaseballTeamsLive } from '../actions/fantasy-baseball-team-live.actions';
import { FantasyBaseballTeams } from '../actions/fantasy-baseball-team.actions';
import { FetchBaseballLeague } from '../actions/mlb.actions';
import { MlbService } from '../services/mlb.service';

@State({
  name: 'fantasyBaseballLeague',
})
@Injectable()
export class FantasyBaseballLeagueState extends FantasyLeagueBaseState() {
  constructor(private mlbService: MlbService, private store: Store) {
    super();
  }

  @Action(FetchBaseballLeague)
  async baseballLeague(
    { setState }: StateContext<FantasyLeagueBaseStateModel>,
    { payload: { leagueId, year } }: FetchBaseballLeague
  ): Promise<void> {
    if (!exists(leagueId)) throw new Error('LeagueId cannot be null');
    try {
      const { id, scoringPeriodId, matchupPeriodCount, firstScoringPeriod, finalScoringPeriod, seasonId, teams, teamsLive } =
        await this.mlbService.baseballLeague(leagueId, year).toPromise();

      this.store.dispatch([
        new FantasyBaseballTeamsLive.ClearAndAdd(teamsLive),
        new FantasyBaseballTeams.ClearAndAdd(teams),
        new FantasyBaseballEvents.Fetch(),
      ]);

      setState({
        id,
        scoringPeriodId,
        matchupPeriodCount,
        seasonId,
        finalScoringPeriod,
        firstScoringPeriod,
      });
    } catch (e) {}
  }
}
