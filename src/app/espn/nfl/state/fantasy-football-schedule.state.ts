import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { FantasyFootballSchedule } from '../actions/fantasy-football-schedule.actions';

@State({ name: FantasyFootballSchedule.stateName })
@Injectable()
export class FantasyFootballScheduleState extends GenericState({
  idProperty: 'id',
  addOrUpdate: FantasyFootballSchedule.AddOrUpdate,
  clearAndAdd: FantasyFootballSchedule.ClearAndAdd,
}) {}
