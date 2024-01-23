import { FantasyLeagueBaseStateModel, IBaseLeagueActionsClass } from './base-league.model';

export function BaseLeagueActions({ stateName }: { stateName: string }): IBaseLeagueActionsClass {
  class BaseLeagueActionsClass {
    static readonly stateName = stateName;

    static SetLeague = class {
      public static readonly type = `[${stateName}] SetLeague`;
      constructor(public payload: { state: FantasyLeagueBaseStateModel }) {}
    };

    static SetCurrentScoringPeriodId = class {
      public static readonly type = `[${stateName}] SetCurrentScoringPeriodId`;
      constructor(public payload: { scoringPeriodId: string | null }) {}
    };

    static Fetch = class {
      public static readonly type = `[${stateName}] Fetch`;
      constructor(public payload: { leagueId: string; year: string }) {}
    };

    static Refresh = class {
      public static readonly type = `[${stateName}] Refresh`;
    };
  }

  return BaseLeagueActionsClass;
}
