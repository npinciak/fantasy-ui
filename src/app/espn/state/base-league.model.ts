import { GenericPayloadClearActionClass, GenericPayloadFetchActionClass } from '@app/@shared/generic-state/generic.model';

export interface FantasyLeagueBaseStateClass {
  // eslint-disable-next-line @typescript-eslint/prefer-function-type
  new (...args: any[]): any;
}

export interface FantasyLeagueBaseStateModel {
  id: string | null;
  seasonId: string | null;
  scoringPeriodId: string | null;
  firstScoringPeriod: string | null;
  finalScoringPeriod: string | null;
  matchupPeriodCount: string | null;
}

export const INITIAL_STATE = {
  id: null,
  seasonId: null,
  scoringPeriodId: null,
  firstScoringPeriod: null,
  finalScoringPeriod: null,
  matchupPeriodCount: null,
};

export interface IBaseLeagueActionsClass {
  new (...args: any[]): any;
  stateName: string;
  SetLeague: GenericPayloadFetchActionClass<{ state: FantasyLeagueBaseStateModel }>;
  Fetch: GenericPayloadFetchActionClass<{ leagueId: string; year: string }>;
  Refresh: GenericPayloadClearActionClass;
}
