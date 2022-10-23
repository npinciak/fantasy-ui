import { Schedule } from '../models/schedule.model';

export class SetSchedule {
  static readonly type = `[dailyFantasySchedule] SetSchedule`;
  constructor(public payload: Schedule[]) {}
}

export class ClearAndAddSchedule {
  static readonly type = `[dailyFantasySchedule] ClearAndAddSchedule`;
  constructor(public payload: Schedule[]) {}
}
