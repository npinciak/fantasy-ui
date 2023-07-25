import { EntityBase } from './entity.model';
import { EventsEntity } from './events-entity.model';

export type LeaguesEntity = EntityBase & {
  isTournament: boolean;
  events?: EventsEntity[];
};
