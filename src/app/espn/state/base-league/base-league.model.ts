import { GenericPayloadClearActionClass, GenericPayloadFetchActionClass } from '@app/@shared/generic-state/generic.model';
import { PropertySelectors } from '@ngxs/store';
import { Observable } from 'rxjs';

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

export interface IBaseLeagueSelectorsClass<T extends FantasyLeagueBaseStateModel> {
  new (...args: any[]): any;
  slices: PropertySelectors<T>;
}

export interface IFantasyLeagueBaseFacade {
  leagueId: string | null;
  seasonId: string | null;
  scoringPeriodId: string | null;
  firstScoringPeriod: string | null;
  finalScoringPeriod: string | null;
  matchupPeriodCount: string | null;
  leagueId$: Observable<string | null>;
  seasonId$: Observable<string | null>;
  scoringPeriodId$: Observable<string | null>;
  firstScoringPeriod$: Observable<string | null>;
  finalScoringPeriod$: Observable<string | null>;
  matchupPeriodCount$: Observable<string | null>;
  setLeague(state): void;
  fetch(leagueId: string, year: string): Observable<void>;
  refresh(): Observable<void>;
}
