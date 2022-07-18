import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchFootballLeague } from '../actions/fantasy-football-league.actions';
import { FantasyFootballLeagueSelectors } from '../selectors/fantasy-football-league.selectors';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballLeagueFacade {
  scoringPeriodId$ = select(FantasyFootballLeagueSelectors.getScoringPeriodId);
  seasonId$ = select(FantasyFootballLeagueSelectors.getSeasonId);

  constructor(private store: Store) {}

  getLeague(leagueId: string): Observable<void> {
    return this.store.dispatch(new FetchFootballLeague({ leagueId }));
  }
}
