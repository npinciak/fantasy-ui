import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { EspnClient } from 'sports-ui-sdk';

export class FantasyFootballEvents extends GenericActions<EspnClient.EventEntity>({
  stateName: 'fantasyFootballEvents',
}) {}
