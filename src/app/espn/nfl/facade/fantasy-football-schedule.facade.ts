import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';

import { FantasyFootballSchedule } from '../actions/fantasy-football-schedule.actions';
import { FantasyFootballScheduleSelectors } from '../selectors/fantasy-football-schedule.selectors';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballScheduleFacade extends GenericFacade({
  selectorClass: FantasyFootballScheduleSelectors,
  actionHandler: FantasyFootballSchedule,
}) {
  matchupListWithFantasyTeams$ = select(FantasyFootballScheduleSelectors.getMatchupListWithFantasyTeams);
  matchupPeriodIds$ = select(FantasyFootballScheduleSelectors.getMatchupPeriodIds);
  matchupPeriodIdFilterOptions$ = select(FantasyFootballScheduleSelectors.getMatchupPeriodIdFilterOptions);
  matchupListWithFantasyTeamsByMatchupPeriodId$ = select(FantasyFootballScheduleSelectors.getMatchupListByMatchupPeriodId);
}
