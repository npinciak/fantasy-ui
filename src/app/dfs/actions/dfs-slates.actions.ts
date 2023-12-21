import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { ClientSiteSlateEntity } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';

export class DfsSlatesActions extends GenericActions<ClientSiteSlateEntity, { sport: string; site: string }>({
  stateName: 'dfsSlates',
}) {}
