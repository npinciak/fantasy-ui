import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { FantasyBaseballProTeamSchedule } from '../actions/fantasy-baseball-pro-team-schedule.actions';

@State({ name: FantasyBaseballProTeamSchedule.stateName })
@Injectable()
export class FantasyBaseballProTeamScheduleState extends GenericState({
  idProperty: 'id',
  actionHandler: FantasyBaseballProTeamSchedule,
}) {}
