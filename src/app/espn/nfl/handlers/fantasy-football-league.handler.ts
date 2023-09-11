import { Injectable } from '@angular/core';
import { FantasyLeagueBaseStateModel } from '@app/espn/state/base-league.model';
import { Action, State, StateContext } from '@ngxs/store';
import { FantasyFootballLeague } from '../actions/fantasy-football-league.actions';
import { FantasyFootballEventsFacade } from '../facade/fantasy-football-events.facade';
import { FantasyFootballLeagueFacade } from '../facade/fantasy-football-league.facade';
import { FantasyFootballScheduleFacade } from '../facade/fantasy-football-schedule.facade';
import { FantasyFootballTeamFacade } from '../facade/fantasy-football-team.facade';
import { FantasyFootballService } from '../services/fantasy-football.service';

@State({ name: FantasyFootballLeague.stateName + 'ActionHandler' })
@Injectable()
export class FantasyFootballLeagueActionHandler {
  constructor(
    private nflService: FantasyFootballService,
    private fantasyFootballLeagueFacade: FantasyFootballLeagueFacade,
    private fantasyFootballTeamFacade: FantasyFootballTeamFacade,
    private fantasyFootballScheduleFacade: FantasyFootballScheduleFacade,
    private fantasyFootballEventsFacade: FantasyFootballEventsFacade
  ) {}

  @Action(FantasyFootballLeague.Fetch)
  async footballLeague(_: StateContext<FantasyLeagueBaseStateModel>, { payload: { leagueId, year } }) {
    try {
      const { id, seasonId, scoringPeriodId, firstScoringPeriod, finalScoringPeriod, teams, matchupPeriodCount, schedule } =
        await this.nflService.fetchLeague(leagueId, year).toPromise();

      const state = { id, scoringPeriodId, matchupPeriodCount, firstScoringPeriod, finalScoringPeriod, seasonId };

      this.fantasyFootballEventsFacade.fetch();

      this.fantasyFootballTeamFacade.addOrUpdate(teams);
      this.fantasyFootballScheduleFacade.addOrUpdate(schedule);
      this.fantasyFootballLeagueFacade.setLeague(state);
    } catch (error) {}
  }
}
