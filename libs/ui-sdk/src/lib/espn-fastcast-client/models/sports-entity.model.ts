import { EntityBase } from './entity.model';
import { LeaguesEntity } from './leagues-entity.model';

export type SportsEntity = Omit<EntityBase, 'abbreviation'> & {
  leagues: LeaguesEntity[];
};
