import { PathEntity, ParticipantsEntity, BetOffersEntity } from '../sportsbook-event-group.model';
import { BaseEntity } from './base.model';

export interface EventsEntity {
  event: Event;
  betOffers?: BetOffersEntity[] | null;
}

export type Event = Omit<BaseEntity, 'outcome' | 'label' | 'englishLabel'> & {
  homeName: string;
  awayName: string;
  group: string;
  groupId: number;
  path?: PathEntity[] | null;
  nonLiveBoCount: number;
  state: string;
  participants?: ParticipantsEntity[] | null;
};
