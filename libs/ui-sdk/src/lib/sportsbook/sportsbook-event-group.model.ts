import { BaseEntity } from './models/base.model';
import { EventsEntity } from './models/event.model';

export type PathEntity = Pick<BaseEntity, 'id' | 'name' | 'englishName'> & {
  termKey: string;
};

export interface ParticipantsEntity {
  participantId: number;
  name: string;
  scratched: boolean;
  nonRunner: boolean;
  home: boolean;
  participantType: string;
}

export type BetOffersEntity = Pick<BaseEntity, 'id'> & {
  closed: string;
  criterion: Criterion;
  betOfferType: BetOfferType;
  eventId: number;
  outcomes?: OutcomesEntity[] | null;
  tags?: string[] | null;
  sortOrder: number;
  cashOutStatus: string;
};

export type Criterion = Pick<BaseEntity, 'id' | 'label' | 'englishLabel'> & {
  order?: null[] | null;
  occurrenceType: string;
  lifetime: string;
};

export type BetOfferType = Pick<BaseEntity, 'id' | 'name' | 'englishName'>;

export type OutcomesEntity = Pick<BaseEntity, 'id' | 'label' | 'englishLabel'> & {
  odds: number;
  participant?: string | null;
  type: string;
  betOfferId: number;
  changedDate: string;
  participantId?: number | null;
  oddsFractional: string;
  oddsAmerican: string;
  status: string;
  cashOutStatus: string;
  line?: number | null;
};

export type TermsEntity = Pick<BaseEntity, 'id' | 'englishName'> & {
  type: string;
  termKey: string;
  localizedName: string;
  parentId: string;
};

export interface CategoryGroupsEntity {
  categoryGroupName: string;
  categories?: CategoriesEntity[] | null;
  localizedName?: string | null;
}

export type CategoriesEntity = Pick<BaseEntity, 'id' | 'englishName'> & {
  localizedName: string;
};
