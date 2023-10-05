import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { SlateTeam } from '../models/slate-team.model';

export class DfsSlateAttributes extends GenericActions<SlateTeam, { slateId: string }>({
  stateName: 'dfsSlateAttributes',
}) {
  /**
   * @deprecated user selectedSlateConfiguration instead
   */
  static SetSlateId = class {
    static readonly type = `[${DfsSlateAttributes.stateName}] SetSlateId`;
    constructor(public payload: { slateId: string }) {}
  };

  /**
   * @deprecated user selectedSlateConfiguration instead
   */
  static SetSite = class {
    static readonly type = `[${DfsSlateAttributes.stateName}] SetSite`;
    constructor(public payload: { site: string }) {}
  };
}
