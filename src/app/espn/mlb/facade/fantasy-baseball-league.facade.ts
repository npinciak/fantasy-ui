import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { FetchBaseballLeague, SetCurrentScoringPeriodId } from '../actions/mlb.actions';
import { FantasyBaseballLeagueSelector } from '../selectors/fantasy-baseball-league.selector';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballLeagueFacade {
  isLoading$ = of(false); //select(FantasyBaseballLeagueState.getIsLoading);
  scoringPeriod$ = select(FantasyBaseballLeagueSelector.getScoringPeriodId);
  seasonConcluded$ = of(FantasyBaseballLeagueSelector.getSeasonConcluded);

  constructor(private store: Store) {}

  get seasonId() {
    return this.store.selectSnapshot(FantasyBaseballLeagueSelector.getSeasonId);
  }

  get leagueId() {
    return this.store.selectSnapshot(FantasyBaseballLeagueSelector.getLeagueId);
  }

  getLeague(leagueId: string, year: string): Observable<void> {
    return this.store.dispatch(new FetchBaseballLeague({ leagueId, year }));
  }

  setScoringPeriodId(currentScoringPeriodId: string | null): Observable<void> {
    return this.store.dispatch(new SetCurrentScoringPeriodId({ currentScoringPeriodId }));
  }
}
