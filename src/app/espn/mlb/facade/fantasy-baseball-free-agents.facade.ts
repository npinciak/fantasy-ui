import { Injectable } from '@angular/core';
import { FilterOptions } from '@app/@shared/models/filter.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BaseballPlayer } from '../models/baseball-player.model';
import { FantasyBaseballFreeAgentsSelector, FreeAgentStats } from '../selectors/fantasy-baseball-free-agents.selector';
import { FetchFantasyBaseballFreeAgents } from '../state/fantasy-baseball-free-agents.state';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballFreeAgentsFacade {
  @Select(FantasyBaseballFreeAgentsSelector.selectPlayerList) public playerList$: Observable<BaseballPlayer[]>;
  @Select(FantasyBaseballFreeAgentsSelector.selectFreeAgentBatterStats) public freeAgentBatterStats$: Observable<
    (id: string, statPeriod: string) => FreeAgentStats[]
  >;
  @Select(FantasyBaseballFreeAgentsSelector.selectFreeAgentPitcherStats) public freeAgentPitcherStats$: Observable<
    (id: string, statPeriod: string) => FreeAgentStats[]
  >;

  @Select(FantasyBaseballFreeAgentsSelector.selectStatListFilters) public selectStatListFilters$: Observable<FilterOptions[]>;
  @Select(FantasyBaseballLeagueState.isLoading) public isLoading$: Observable<boolean>;

  constructor(private store: Store) {}

  fetchFreeAgents(leagueId: string, scoringPeriodId: string): void {
    this.store.dispatch(new FetchFantasyBaseballFreeAgents({ leagueId, scoringPeriodId }));
  }

  selectPlayerById(id: string): BaseballPlayer {
    return this.store.selectSnapshot(FantasyBaseballFreeAgentsSelector.selectPlayerById)(id);
  }
}
