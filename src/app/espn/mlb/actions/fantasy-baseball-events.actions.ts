import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { BaseballEvent } from '../models/baseball-event.model';

export class FantasyBaseballEvents extends GenericActions<BaseballEvent>({
  stateName: 'fantasyBaseballEvents',
}) {}
