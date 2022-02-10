import { Injectable } from '@angular/core';
import { Team } from '@app/espn/models/team.model';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchBaseballLeague } from '../actions/mlb.actions';
import { BaseballTeam } from '../models/baseball-team.model';
import { FantasyBaseballLeagueSelectors } from '../selectors/fantasy-baseball-league.selectors';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballLeagueFacade {
  @Select(FantasyBaseballLeagueState.isLoading) public isLoading$: Observable<boolean>;
  @Select(FantasyBaseballLeagueSelectors.standings) public standings$: Observable<BaseballTeam[]>;

  constructor(private store: Store) {}

  @SelectSnapshot(FantasyBaseballLeagueState.scoringPeriod) public scoringPeriod: number;

  getLeague(leagueId: number): void {
    this.store.dispatch(new FetchBaseballLeague({ leagueId }));
  }
}
