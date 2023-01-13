import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { FetchBaseballLeague, SetCurrentScoringPeriodId } from '../actions/mlb.actions';
import { FantasyBaseballLeagueSelectors } from '../selectors/fantasy-baseball-league.selectors';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballLeagueFacade {
  isLoading$ = select(FantasyBaseballLeagueState.getIsLoading);
  scoringPeriod$ = of();
  standings$ = select(FantasyBaseballLeagueSelectors.standings);

  constructor(private store: Store) {}

  get seasonId() {
    return this.store.selectSnapshot(FantasyBaseballLeagueState.getSeasonId);
  }

  get leagueId() {
    return this.store.selectSnapshot(FantasyBaseballLeagueState.getLeagueId);
  }

  getLeague(leagueId: string, year: string): Observable<void> {
    return this.store.dispatch(new FetchBaseballLeague({ leagueId, year }));
  }

  setScoringPeriodId(currentScoringPeriodId: string | null): Observable<void> {
    return this.store.dispatch(new SetCurrentScoringPeriodId({ currentScoringPeriodId }));
  }
}
