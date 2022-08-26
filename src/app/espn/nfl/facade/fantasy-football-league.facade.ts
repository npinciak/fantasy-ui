import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchFootballLeague, SetCurrentScoringPeriodId } from '../actions/fantasy-football-league.actions';
import { FantasyFootballLeagueSelectors } from '../selectors/fantasy-football-league.selectors';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballLeagueFacade {
  currentScoringPeriodId$ = select(FantasyFootballLeagueSelectors.getCurrentScoringPeriodId);
  seasonId$ = select(FantasyFootballLeagueSelectors.getSeasonId);
  standings$ = select(FantasyFootballLeagueSelectors.standings);

  // positionLimits$ = select(FantasyFootballLeagueSelectors.getLineupLimitsWithLabels);

  constructor(private store: Store) {}

  getLeague(leagueId: string): Observable<void> {
    return this.store.dispatch(new FetchFootballLeague({ leagueId }));
  }

  updateCurrentScoringPeriodId(currentScoringPeriodId: number) {
    return this.store.dispatch(new SetCurrentScoringPeriodId({ currentScoringPeriodId }));
  }
}
