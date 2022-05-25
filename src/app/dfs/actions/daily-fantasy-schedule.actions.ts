import { Schedule } from '../models/schedule.model';

export class PatchSchedule {
  static readonly type = `[dailyFantasySchedule] PatchSchedule`;
  constructor(public payload: Schedule[]) {}
}
