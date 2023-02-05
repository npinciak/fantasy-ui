import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { FastcastEvent } from '../models/fastcast-event.model';

export class FastcastEvents extends GenericActions<FastcastEvent>({
  stateName: 'espnFastcastEvents',
}) {}
