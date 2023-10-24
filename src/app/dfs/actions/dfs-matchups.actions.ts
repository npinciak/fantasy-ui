import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { Schedule } from '../models/schedule.model';

export class DfsMatchupsActions extends GenericActions<Schedule>({
  stateName: 'dfsMatchup',
}) {}
