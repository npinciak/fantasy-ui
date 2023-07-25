import { AthleteEntity } from './athlete-entity.model';
import { TeamAttributes } from './team-attributes.model';

export interface Leader {
  displayValue: string;
  value: number;
  athlete: AthleteEntity;
  team: TeamAttributes;
}
