import { FantasyLeagueBaseStateModel, IBaseLeagueActionsClass } from './base-league.model';

export function BaseLeagueActions({ stateName }: { stateName: string }): IBaseLeagueActionsClass {
  class BaseLeagueActionsClass {
    static readonly stateName = stateName;

    static SetLeague = class {
      public static readonly type = `[${stateName}] SetLeague`;
      constructor(public payload: { state: FantasyLeagueBaseStateModel }) {}
    };

    static Fetch = class {
      public static readonly type = `[${stateName}] Fetch`;
      constructor(public payload: { leagueId: string; year: string }) {}
    };

    static Refresh = class {
      public static readonly type = `[${stateName}] Refresh`;
    };

    static SetCurrentScoringPeriodStartDate = class {
      public static readonly type = `[${stateName}] SetCurrentScoringPeriodStartDate`;
      constructor(public payload: { currentScoringPeriodStartDate: string | null }) {}
    };

    static SetCurrentScoringPeriodEndDate = class {
      public static readonly type = `[${stateName}] SetCurrentScoringPeriodEndDate`;
      constructor(public payload: { currentScoringPeriodEndDate: string | null }) {}
    };
  }

  return BaseLeagueActionsClass;
}
