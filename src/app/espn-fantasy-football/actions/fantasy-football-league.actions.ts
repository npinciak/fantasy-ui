import { BaseLeagueActions } from '@app/espn/state/base-league.actions';

export class FantasyFootballLeague extends BaseLeagueActions({
  stateName: 'fantasyFootballLeague',
}) {
  static SetCurrentScoringPeriodId = class {
    public static readonly type = `[${FantasyFootballLeague.stateName}] SetCurrentScoringPeriodId`;
    constructor(public payload: { scoringPeriodId: string | null }) {}
  };
}
