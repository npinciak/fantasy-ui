import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { Schedule } from '../models/schedule.model';

export class DailyFantasyMatchups extends GenericActions<Schedule>({
  stateName: 'dailyFantasyMatchup',
}) {}
