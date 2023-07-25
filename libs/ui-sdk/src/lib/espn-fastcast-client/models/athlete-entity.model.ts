import { EntityBase } from './entity.model';
import { TeamAttributes } from './team-attributes.model';

export type AthleteEntityProps<T> = Pick<EntityBase, 'id'> & {
  fullName: T;
  displayName: T;
  shortName: T;
  headshot: T;
  jersey: T;
  position: T;
};

export type AthleteEntity = AthleteEntityProps<string> & {
  team: TeamAttributes;
  lastName?: string | null;
  active: boolean;
};
