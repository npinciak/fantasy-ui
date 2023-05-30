import { TermsEntity, CategoryGroupsEntity } from '../sportsbook-event-group.model';
import { EventsEntity } from './event.model';

export interface EventGroup {
  events?: EventsEntity[] | null;
  terms?: TermsEntity[] | null;
  activeTermIds?: string[] | null;
  soonMode: string;
  categoryGroups?: CategoryGroupsEntity[] | null;
  activeCategories?: string[] | null;
  activeEventTypes?: string[] | null;
  eventTypes?: string[] | null;
  defaultEventType: string;
}
