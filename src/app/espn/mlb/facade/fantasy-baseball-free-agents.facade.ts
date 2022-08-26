import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchFantasyBaseballFreeAgents } from '../actions/fantasy-baseball-free-agents.actions';
import { FantasyBaseballFreeAgentsSelector } from '../selectors/fantasy-baseball-free-agents.selector';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballFreeAgentsFacade {
  playerList$ = select(FantasyBaseballFreeAgentsSelector.getIdList);
  freeAgentBatterStats$ = select(FantasyBaseballFreeAgentsSelector.getFreeAgentBatterStats);
  freeAgentBatterChartData$ = select(FantasyBaseballFreeAgentsSelector.getFreeAgentBatterChartData);
  freeAgentBatterScatterChartData$ = select(FantasyBaseballFreeAgentsSelector.getFreeAgentBatterScatterChartData);

  freeAgentPitcherStats$ = select(FantasyBaseballFreeAgentsSelector.getFreeAgentPitcherStats);
  freeAgentPitcherChartData$ = select(FantasyBaseballFreeAgentsSelector.getFreeAgentPitcherChartData);

  selectStatListFilters$ = select(FantasyBaseballFreeAgentsSelector.selectStatListFilters);
  compareTeamAndFreeAgentBatterList$ = select(FantasyBaseballFreeAgentsSelector.getCompareTeamAndFreeAgentBatterList);
  compareTeamAndFreeAgentPitcherList$ = select(FantasyBaseballFreeAgentsSelector.getCompareTeamAndFreeAgentPitcherList);

  constructor(private store: Store) {}

  fetchFreeAgents(): Observable<void> {
    return this.store.dispatch(new FetchFantasyBaseballFreeAgents());
  }
}
