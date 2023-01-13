import { Injectable } from '@angular/core';
import { exists } from '@app/@shared/helpers/utils';
import { Selector } from '@app/@shared/models/typed-selector';
import { FantasyLeagueBaseState, FantasyLeagueBaseStateModel } from '@app/espn/state/base-league.state';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { FantasyBaseballEvents } from '../actions/fantasy-baseball-events.actions';
import { FantasyBaseballTeams } from '../actions/fantasy-baseball-team.actions';
import { FetchBaseballLeague } from '../actions/mlb.actions';
import { MlbService } from '../services/mlb.service';
import { SetEspnFantasyLeagueTeamsLive } from './fantasy-baseball-team-live.state';

@State({
  name: 'fantasyBaseballLeague',
})
@Injectable()
export class FantasyBaseballLeagueState extends FantasyLeagueBaseState({}) {
  constructor(private mlbService: MlbService, private store: Store) {
    super();
  }

  @Selector([FantasyBaseballLeagueState.getState])
  static getIsLoading(state: FantasyLeagueBaseStateModel): boolean {
    return state.isLoading;
  }

  @Action(FetchBaseballLeague)
  async baseballLeague(
    { patchState, dispatch }: StateContext<FantasyLeagueBaseStateModel>,
    { payload: { leagueId, year } }: FetchBaseballLeague
  ): Promise<void> {
    patchState({ isLoading: true });

    if (!exists(leagueId)) throw new Error('LeagueId cannot be null');

    const { id, scoringPeriodId, firstScoringPeriod, finalScoringPeriod, seasonId, teams, teamsLive } = await this.mlbService
      .baseballLeague(leagueId, year)
      .toPromise();

    const events = await this.mlbService.baseballEvents().toPromise();

    dispatch([
      new SetEspnFantasyLeagueTeamsLive(teamsLive),
      new FantasyBaseballTeams.AddOrUpdate(teams),
      new FantasyBaseballEvents.ClearAndAdd(events),
    ]);

    patchState({ id, seasonId, finalScoringPeriod, firstScoringPeriod, isLoading: false });
  }
}
