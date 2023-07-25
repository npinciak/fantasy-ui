import { AthleteEntityProps } from './athlete-entity.model';
import { EntityBase } from './entity.model';
import { TeamAttributes } from './team-attributes.model';

export type LastPlay = Pick<EntityBase, 'id'> & {
  type: LastPlayType;
  text: string;
  scoreValue: number;
  team?: Pick<TeamAttributes, 'id'> | null;
  athletesInvolved?: AthletesInvolvedEntity[] | null;
};

export type LastPlayType = Pick<EntityBase, 'id'> & {
  text: string;
  abbreviation?: string | null;
};

export type AthletesInvolvedEntity = AthleteEntityProps<string> & {
  team: Pick<TeamAttributes, 'id'>;
};
