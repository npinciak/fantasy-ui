import { Injectable } from '@angular/core';
import { exists } from '@app/@shared/utilities/utilities.m';
import { FantasyLeagueBaseStateModel } from '@app/espn/state/base-league.model';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { FantasyFootballLeague } from '../actions/fantasy-football-league.actions';
import { FantasyFootballSchedule } from '../actions/fantasy-football-schedule.actions';
import { FantasyFootballTeam } from '../actions/fantasy-football-team.actions';
import { FantasyFootballLeagueFacade } from '../facade/fantasy-football-league.facade';
import { FantasyFootballService } from '../services/fantasy-football.service';

@State({ name: FantasyFootballLeague.stateName + 'ActionHandler' })
@Injectable()
export class FantasyFootballLeagueActionHandler {
  constructor(
    private nflService: FantasyFootballService,
    private fantasyFootballLeagueFacade: FantasyFootballLeagueFacade,
    private store: Store
  ) {}

  @Action(FantasyFootballLeague.Fetch)
  async footballLeague(_: StateContext<FantasyLeagueBaseStateModel>, { payload: { leagueId, year } }) {
    try {
      const { id, seasonId, scoringPeriodId, firstScoringPeriod, finalScoringPeriod, teams, matchupPeriodCount, schedule } =
        await this.nflService.fetchLeague(leagueId, year).toPromise();

      const state = { id, scoringPeriodId, matchupPeriodCount, firstScoringPeriod, finalScoringPeriod, seasonId };

      await this.store
        .dispatch([
          new FantasyFootballTeam.ClearAndAdd(teams),
          new FantasyFootballSchedule.ClearAndAdd(schedule),
          new FantasyFootballLeague.SetLeague({ state }),
        ])
        .toPromise();
    } catch (error) {}
  }

  @Action(FantasyFootballLeague.Refresh)
  refresh() {
    const leagueId = this.fantasyFootballLeagueFacade.leagueId;
    const year = this.fantasyFootballLeagueFacade.seasonId;

    if (!exists(leagueId)) throw new Error('leagueId cannot be null');
    if (!exists(year)) throw new Error('year cannot be null');

    this.store.dispatch(new FantasyFootballLeague.Fetch({ leagueId, year }));
  }

  @Action(FantasyFootballLeague.SetCurrentScoringPeriodId)
  setCurrentScoringPeriodId({ patchState }: StateContext<FantasyLeagueBaseStateModel>, { payload: { scoringPeriodId } }) {
    patchState({ scoringPeriodId });
  }
}
