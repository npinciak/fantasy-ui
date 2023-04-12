import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { SlateTeam } from '../models/slate-team.model';

export class DfsSlateAttributes extends GenericActions<SlateTeam, { slate: string }>({
  stateName: 'dfsSlateAttributes',
}) {}
