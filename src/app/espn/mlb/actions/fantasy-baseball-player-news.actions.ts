import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { EspnClient } from 'sports-ui-sdk';

export class FantasyBaseballPlayerNews extends GenericActions<EspnClient.PlayerNewsFeedEntity>({
  stateName: 'fantasyBaseballPlayerNews',
}) {
  constructor() {
    super();
  }

  static Fetch: { type: string; new (payload: { playerId: string }): { payload: { playerId: string } } } = class {
    public static readonly type = `[${FantasyBaseballPlayerNews.stateName}] Fetch`;
    constructor(public payload: { playerId: string }) {}
  };
}
