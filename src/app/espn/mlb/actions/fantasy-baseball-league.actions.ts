import { BaseLeagueActions } from '@app/espn/state/base-league.actions';

export class FantasyBaseballLeague extends BaseLeagueActions({
  stateName: 'fantasyBaseballLeague',
}) {
  static SetCurrentScoringPeriodId = class {
    public static readonly type = `[${FantasyBaseballLeague.stateName}] SetCurrentScoringPeriodId`;
    constructor(public payload: { scoringPeriodId: string | null }) {}
  };
}
