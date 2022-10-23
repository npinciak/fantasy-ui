import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { ClearAndAddFantasyFootballSchedule, SetFantasyFootballSchedule } from '../actions/fantasy-football-schedule.actions';

@State({ name: 'fantasyFootballSchedule' })
@Injectable()
export class FantasyFootballScheduleState extends GenericState({
  idProperty: 'id',
  addOrUpdate: SetFantasyFootballSchedule,
  clearAndAdd: ClearAndAddFantasyFootballSchedule,
}) {}
