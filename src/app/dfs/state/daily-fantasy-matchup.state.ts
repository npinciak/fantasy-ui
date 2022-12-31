import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { ClearAndAddSchedule, SetSchedule } from '../actions/daily-fantasy-schedule.actions';

@State({ name: 'dailyFantasyMatchup' })
@Injectable()
export class DailyFantasyMatchupState extends GenericState({
  idProperty: 'id',
  addOrUpdate: SetSchedule,
  clearAndAdd: ClearAndAddSchedule,
}) {}
