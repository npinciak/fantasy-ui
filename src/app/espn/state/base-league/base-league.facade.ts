import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  FantasyLeagueBaseStateModel,
  IBaseLeagueActionsClass,
  IBaseLeagueSelectorsClass,
  IFantasyLeagueBaseFacade,
} from './base-league.model';

export function FantasyLeagueBaseFacade<T extends FantasyLeagueBaseStateModel>({
  actionHandler,
  selectorClass,
}: {
  actionHandler: IBaseLeagueActionsClass;
  selectorClass: IBaseLeagueSelectorsClass<T>;
}): {
  new (...args: any[]): IFantasyLeagueBaseFacade;
} {
  @Injectable()
  class FantasyLeagueBaseFacadeClass {
    leagueId$: Observable<string | null> = select(selectorClass.slices.id);
    seasonId$: Observable<string | null> = select(selectorClass.slices.seasonId);
    scoringPeriodId$: Observable<string | null> = select(selectorClass.slices.scoringPeriodId);
    firstScoringPeriod$: Observable<string | null> = select(selectorClass.slices.firstScoringPeriod);
    finalScoringPeriod$: Observable<string | null> = select(selectorClass.slices.finalScoringPeriod);
    matchupPeriodCount$: Observable<string | null> = select(selectorClass.slices.matchupPeriodCount);

    constructor(private store: Store) {}

    get leagueId(): string | null {
      return this.store.selectSnapshot(selectorClass.slices.id);
    }

    get seasonId(): string | null {
      return this.store.selectSnapshot(selectorClass.slices.seasonId);
    }

    get scoringPeriodId(): string | null {
      return this.store.selectSnapshot(selectorClass.slices.scoringPeriodId);
    }

    get firstScoringPeriod(): string | null {
      return this.store.selectSnapshot(selectorClass.slices.firstScoringPeriod);
    }

    get finalScoringPeriod(): string | null {
      return this.store.selectSnapshot(selectorClass.slices.finalScoringPeriod);
    }

    get matchupPeriodCount(): string | null {
      return this.store.selectSnapshot(selectorClass.slices.matchupPeriodCount);
    }

    setLeague(state: any): Observable<void> {
      return this.store.dispatch(new actionHandler.SetLeague({ state }));
    }

    setCurrentScoringPeriodId(scoringPeriodId: string): Observable<void> {
      return this.store.dispatch(new actionHandler.SetCurrentScoringPeriodId({ scoringPeriodId }));
    }

    fetch(leagueId: string, year: string): Observable<void> {
      return this.store.dispatch(new actionHandler.Fetch({ leagueId, year }));
    }

    refresh(): Observable<void> {
      return this.store.dispatch(new actionHandler.Refresh());
    }
  }

  return FantasyLeagueBaseFacadeClass;
}
