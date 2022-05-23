import { Injectable } from '@angular/core';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchFantasyBaseballFreeAgents } from '../actions/fantasy-baseball-free-agents.actions';
import { BaseballPlayer } from '../models/baseball-player.model';
import { FantasyBaseballFreeAgentsSelector, FreeAgentStats } from '../selectors/fantasy-baseball-free-agents.selector';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballFreeAgentsFacade {
  @Select(FantasyBaseballFreeAgentsSelector.getList) public playerList$: Observable<BaseballPlayer[]>;
  @Select(FantasyBaseballFreeAgentsSelector.getFreeAgentBatterStats) public freeAgentBatterStats$: Observable<
    (id: string, statPeriod: string) => FreeAgentStats[]
  >;
  @Select(FantasyBaseballFreeAgentsSelector.getFreeAgentPitcherStats) public freeAgentPitcherStats$: Observable<
    (id: string, statPeriod: string) => FreeAgentStats[]
  >;

  @Select(FantasyBaseballFreeAgentsSelector.selectStatListFilters) public selectStatListFilters$: Observable<FilterOptions[]>;
  @Select(FantasyBaseballLeagueState.isLoading) public isLoading$: Observable<boolean>;

  constructor(private store: Store) {}

  fetchFreeAgents(leagueId: string, scoringPeriodId: string): void {
    this.store.dispatch(new FetchFantasyBaseballFreeAgents({ leagueId, scoringPeriodId }));
  }
}
