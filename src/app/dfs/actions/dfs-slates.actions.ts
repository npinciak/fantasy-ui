import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { SiteSlateEntity } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';

export class DfsSlatesActions extends GenericActions<SiteSlateEntity, { sport: string; site: string }>({
  stateName: 'dfsSlates',
}) {}
