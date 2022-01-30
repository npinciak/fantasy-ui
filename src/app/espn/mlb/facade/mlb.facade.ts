import { Injectable } from '@angular/core';
import { Team } from '@app/espn/models/team.model';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchBaseballLeague } from '../actions/mlb.actions';
import { FantasyBaseballLeagueSelectors } from '../selectors/fantasy-baseball-league.selectors';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';

@Injectable({
  providedIn: 'root',
})
export class MlbFacade {
  @Select(FantasyBaseballLeagueSelectors.selectStandings) public standings$: Observable<Team[]>;

  @Select(FantasyBaseballLeagueSelectors.selectStandings) public liveScore$: Observable<Team[]>;

  @Select(FantasyBaseballLeagueState.isLoading) public isLoading$: Observable<boolean>;

  @SelectSnapshot(FantasyBaseballLeagueState.scoringPeriod) public scoringPeriod: number;

  getLeague = (leagueId: number) => new FetchBaseballLeague(leagueId);
}
