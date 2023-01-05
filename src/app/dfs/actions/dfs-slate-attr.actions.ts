import { GenericActions } from '@app/@shared/generic-state/generic.actions';

export class DfsSlateAttributes extends GenericActions<[], { slate: string }>({
  stateName: 'dfsSlateAttributes',
}) {}
