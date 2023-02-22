import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { PlayerNews } from '@app/espn/models/player-news.model';

export class FantasyFootballPlayerNews extends GenericActions<PlayerNews>({
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
