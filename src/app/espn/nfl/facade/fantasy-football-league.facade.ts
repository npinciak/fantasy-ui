import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FantasyFootballLeague } from '../actions/fantasy-football-league.actions';
import { FantasyFootballLeagueSelectors } from '../selectors/fantasy-football-league.selectors';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballLeagueFacade {
  currentScoringPeriodId$ = select(FantasyFootballLeagueSelectors.getCurrentScoringPeriodId);
  scoringPeriodFilterOptions$ = select(FantasyFootballLeagueSelectors.scoringPeriodFilters);
  seasonId$ = select(FantasyFootballLeagueSelectors.getSeasonId);
  standings$ = select(FantasyFootballLeagueSelectors.standings);
  isLoading$ = select(FantasyFootballLeagueSelectors.isLoading);

  // positionLimits$ = select(FantasyFootballLeagueSelectors.getLineupLimitsWithLabels);

  constructor(private store: Store) {}

  get seasonId() {
    return this.store.selectSnapshot(FantasyFootballLeagueSelectors.getSeasonId);
  }

  get leagueId() {
    return this.store.selectSnapshot(FantasyFootballLeagueSelectors.getLeagueId);
  }

  getLeague(leagueId: string, year: string): Observable<void> {
    return this.store.dispatch(new FantasyFootballLeague.Fetch({ leagueId, year }));
  }

  refreshCurrentLeague(): Observable<void> {
    return this.store.dispatch(new FantasyFootballLeague.Refresh());
  }

  updateCurrentScoringPeriodId(scoringPeriodId: string) {
    return this.store.dispatch(new FantasyFootballLeague.SetCurrentScoringPeriodId({ scoringPeriodId }));
  }
}
