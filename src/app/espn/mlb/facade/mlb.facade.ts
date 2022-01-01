import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { FetchBaseballLeague } from '../actions/mlb.actions';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';
import { FantasyBaseballLeagueSelectors } from '../selectors/fantasy-baseball-league.selectors';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class MlbFacade {
  @Select(FantasyBaseballLeagueSelectors.selectStandings) public standings$: Observable<Team[]>;

  @Select(FantasyBaseballLeagueSelectors.selectStandings) public liveScore$: Observable<Team[]>;

  @Select(FantasyBaseballLeagueState.isLoading) public isLoading$: Observable<boolean>;

  @SelectSnapshot(FantasyBaseballLeagueState.scoringPeriod) public scoringPeriod: number;

  @Dispatch() getLeague = (leagueId: number) => new FetchBaseballLeague(leagueId);
}
