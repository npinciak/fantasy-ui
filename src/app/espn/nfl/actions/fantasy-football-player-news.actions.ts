import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { EspnClient } from 'sports-ui-sdk/lib/models/espn-client.model';

export class FantasyFootballPlayerNews extends GenericActions<EspnClient.PlayerNewsFeedEntity>({
  stateName: 'fantasyFootballPlayerNews',
}) {
  constructor() {
    super();
  }

  static Fetch: { type: string; new (payload: { playerId: string }): { payload: { playerId: string } } } = class {
    public static readonly type = `[${FantasyFootballPlayerNews.stateName}] Fetch`;
    constructor(public payload: { playerId: string }) {}
  };
}
