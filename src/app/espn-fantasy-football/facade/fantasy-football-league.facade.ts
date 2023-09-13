import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { FantasyLeagueBaseStateModel } from '@app/espn/state/base-league.model';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { FantasyFootballLeague } from '../actions/fantasy-football-league.actions';
import { FantasyFootballLeagueSelector } from '../selectors/fantasy-football-league.selectors';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballLeagueFacade {
  leagueLinkout$ = select(FantasyFootballLeagueSelector.leagueLinkout);

  currentScoringPeriodId$ = select(FantasyFootballLeagueSelector.slices.scoringPeriodId);
  finalScoringPeriodId$ = select(FantasyFootballLeagueSelector.slices.finalScoringPeriod);
  scoringPeriodFilterOptions$ = select(FantasyFootballLeagueSelector.scoringPeriodFilters);
  seasonId$ = select(FantasyFootballLeagueSelector.slices.seasonId);
  isLoading$ = of(false); // select(FantasyFootballLeagueSelectors.isLoading);

  // positionLimits$ = select(FantasyFootballLeagueSelectors.getLineupLimitsWithLabels);

  constructor(private store: Store) {}

  get currentScoringPeriodId() {
    return this.store.selectSnapshot(FantasyFootballLeagueSelector.slices.scoringPeriodId);
  }

  get seasonId() {
    return this.store.selectSnapshot(FantasyFootballLeagueSelector.slices.seasonId);
  }

  get leagueId() {
    return this.store.selectSnapshot(FantasyFootballLeagueSelector.slices.id);
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

  setLeague(state: FantasyLeagueBaseStateModel) {
    return this.store.dispatch(new FantasyFootballLeague.SetLeague({ state }));
  }
}
