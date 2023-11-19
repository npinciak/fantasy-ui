import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { PlayerNews } from '@app/espn/models/player-news.model';

export class FantasyBaseballPlayerNews extends GenericActions<PlayerNews>({
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
