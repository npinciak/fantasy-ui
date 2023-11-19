import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { BaseballPlayer } from '../models/baseball-player.model';

export class FantasyBaseballFreeAgents extends GenericActions<BaseballPlayer>({
  stateName: 'fantasyBaseballFreeAgents',
}) {
  Fetch = class {
    static readonly type = `[${FantasyBaseballFreeAgents.stateName}] Fetch`;
    constructor(public payload: { leagueId: string }) {}
  };
}
