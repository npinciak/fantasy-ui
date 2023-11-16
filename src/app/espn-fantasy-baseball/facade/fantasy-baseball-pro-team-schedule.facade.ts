import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { FantasyBaseballProTeamSchedule } from '../actions/fantasy-baseball-pro-team-schedule.actions';
import { FantasyBaseballProTeamScheduleSelector } from '../selectors/fantasy-baseball-pro-team-schedule.selector';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballProTeamScheduleFacade extends GenericFacade({
  selectorClass: FantasyBaseballProTeamScheduleSelector,
  actionHandler: FantasyBaseballProTeamSchedule,
}) {}
