import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { SiteSlateEntity } from '@dfsClient/daily-fantasy-client.model';

export class DfsSlates extends GenericActions<SiteSlateEntity, { sport: string; site: string }>({
  stateName: 'dfsSlates',
}) {}
