import { Injectable } from '@angular/core';
import { Team } from '@app/espn/models/team.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FantasyBaseballTeamSelectors } from '../selectors/fantasy-baseball-team.selector';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballTeamFacade {
  @Select(FantasyBaseballTeamSelectors.selectTeamList) public standings$: Observable<Team[]>;

  @Select(FantasyBaseballTeamSelectors.selectTeamList) public liveScore$: Observable<Team[]>;

  @Select(FantasyBaseballLeagueState.isLoading) public isLoading$: Observable<boolean>;

  constructor(private store: Store) {}
}
