import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchBaseballLeague } from '../actions/mlb.actions';
import { FantasyBaseballLeagueSelectors } from '../selectors/fantasy-baseball-league.selectors';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballLeagueFacade {
  isLoading$ = select(FantasyBaseballLeagueState.isLoading);
  scoringPeriod$ = select(FantasyBaseballLeagueState.scoringPeriod);
  standings$ = select(FantasyBaseballLeagueSelectors.standings);
  localStorageLeagueList$ = select(FantasyBaseballLeagueSelectors.getLocalStorageLeagues);
  statsGroup$ = select(FantasyBaseballLeagueSelectors.statsGroup);

  constructor(private store: Store) {}

  getLeague(leagueId: number): Observable<void> {
    return this.store.dispatch(new FetchBaseballLeague({ leagueId }));
  }
}
