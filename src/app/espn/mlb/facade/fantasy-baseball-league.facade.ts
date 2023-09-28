import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { FantasyBaseballLeague } from '../actions/fantasy-baseball-league.actions';
import { FantasyBaseballLeagueSelector } from '../selectors/fantasy-baseball-league.selector';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballLeagueFacade {
  isLoading$ = of(false); //select(FantasyBaseballLeagueState.getIsLoading);
  scoringPeriod$ = select(FantasyBaseballLeagueSelector.slices.scoringPeriodId);

  scoringPeriodFilters$ = select(FantasyBaseballLeagueSelector.scoringPeriodFilters);

  constructor(private store: Store) {}

  get scoringPeriod() {
    return this.store.selectSnapshot(FantasyBaseballLeagueSelector.slices.scoringPeriodId);
  }

  get seasonId() {
    return this.store.selectSnapshot(FantasyBaseballLeagueSelector.slices.seasonId);
  }

  get leagueId() {
    return this.store.selectSnapshot(FantasyBaseballLeagueSelector.slices.id);
  }

  /**
   * @deprecated use FantasyBaseballLeagueFacade.getLeague()
   */
  refreshCurrentLeague(): Observable<void> {
    return this.store.dispatch(new FantasyBaseballLeague.Refresh());
  }

  getLeague(leagueId: string, year: string): Observable<void> {
    return this.store.dispatch(new FantasyBaseballLeague.Fetch({ leagueId, year }));
  }

  setScoringPeriodId(scoringPeriodId: string | null): Observable<void> {
    return this.store.dispatch(new FantasyBaseballLeague.SetCurrentScoringPeriodId({ scoringPeriodId }));
  }
}
