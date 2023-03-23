import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { FantasyFootballLeague } from '../actions/fantasy-football-league.actions';
import { FantasyFootballLeagueSelector } from '../selectors/fantasy-football-league.selectors';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballLeagueFacade {
  currentScoringPeriodId$ = select(FantasyFootballLeagueSelector.getScoringPeriodId);
  finalScoringPeriodId$ = select(FantasyFootballLeagueSelector.getFinalScoringPeriod);
  scoringPeriodFilterOptions$ = select(FantasyFootballLeagueSelector.scoringPeriodFilters);
  seasonId$ = select(FantasyFootballLeagueSelector.getSeasonId);
  isLoading$ = of(false); // select(FantasyFootballLeagueSelectors.isLoading);

  // positionLimits$ = select(FantasyFootballLeagueSelectors.getLineupLimitsWithLabels);

  constructor(private store: Store) {}

  get seasonId() {
    return this.store.selectSnapshot(FantasyFootballLeagueSelector.getSeasonId);
  }

  get leagueId() {
    return this.store.selectSnapshot(FantasyFootballLeagueSelector.getLeagueId);
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
