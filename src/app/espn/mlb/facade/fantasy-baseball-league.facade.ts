import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchBaseballLeague, SetCurrentScoringPeriodId } from '../actions/mlb.actions';
import { FantasyBaseballLeagueSelectors } from '../selectors/fantasy-baseball-league.selectors';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballLeagueFacade {
  isLoading$ = select(FantasyBaseballLeagueState.getIsLoading);
  scoringPeriod$ = select(FantasyBaseballLeagueState.getCurrentScoringPeriodId);
  standings$ = select(FantasyBaseballLeagueSelectors.standings);
  localStorageLeagueList$ = select(FantasyBaseballLeagueSelectors.getLocalStorageLeagues);

  constructor(private store: Store) {}

  getLeague(leagueId: string | null): Observable<void> {
    return this.store.dispatch(new FetchBaseballLeague({ leagueId }));
  }

  setScoringPeriodId(currentScoringPeriodId: number | null): Observable<void> {
    return this.store.dispatch(new SetCurrentScoringPeriodId({ currentScoringPeriodId }));
  }
}
