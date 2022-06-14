import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { SetSchedule } from '../actions/daily-fantasy-schedule.actions';

@State({ name: 'dailyFantasySchedule' })
@Injectable()
export class DailyFantasyScheduleState extends GenericState({ idProperty: 'id', addOrUpdate: SetSchedule }) {}
