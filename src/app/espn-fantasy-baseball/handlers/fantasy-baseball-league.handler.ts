import { Injectable } from '@angular/core';
import { FantasyLeagueBaseStateModel } from '@app/espn/state/base-league/base-league.model';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { exists } from '@sports-ui/ui-sdk/helpers';
import { firstValueFrom } from 'rxjs';
import { FantasyBaseballEvents } from '../actions/fantasy-baseball-events.actions';
import { FantasyBaseballLeague } from '../actions/fantasy-baseball-league.actions';
import { FantasyBaseballTeamsLive } from '../actions/fantasy-baseball-team-live.actions';
import { FantasyBaseballTeams } from '../actions/fantasy-baseball-team.actions';
import { FantasyBaseballTransactions } from '../actions/fantasy-baseball-transactions.actions';
import { FantasyBaseballService } from '../services/fantasy-baseball.service';

@State({ name: FantasyBaseballLeague.stateName + 'ActionHandler' })
@Injectable()
export class FantasyBaseballLeagueActionHandler {
  constructor(private mlbService: FantasyBaseballService, private store: Store) {}

  @Action(FantasyBaseballLeague.Fetch)
  async baseballLeague(
    { setState }: StateContext<FantasyLeagueBaseStateModel>,
    { payload: { leagueId, year } } //: FantasyBaseballLeague.Fetch
  ): Promise<void> {
    if (!exists(leagueId)) throw new Error('LeagueId cannot be null');
    try {
      const { id, scoringPeriodId, matchupPeriodCount, firstScoringPeriod, finalScoringPeriod, seasonId, teams, teamsLive, transactions } =
        await firstValueFrom(this.mlbService.baseballLeague(leagueId, year));

      const state = { id, scoringPeriodId, matchupPeriodCount, firstScoringPeriod, finalScoringPeriod, seasonId };

      await firstValueFrom(
        this.store.dispatch([
          new FantasyBaseballEvents.Fetch(),
          new FantasyBaseballTeamsLive.AddOrUpdate(teamsLive),
          new FantasyBaseballTeams.AddOrUpdate(teams),
          new FantasyBaseballTransactions.AddOrUpdate(transactions ?? []),
          new FantasyBaseballLeague.SetLeague({ state }),
        ])
      );
    } catch (e) {}
  }
}
