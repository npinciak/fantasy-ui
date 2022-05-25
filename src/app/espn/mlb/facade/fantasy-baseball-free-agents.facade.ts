import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchFantasyBaseballFreeAgents } from '../actions/fantasy-baseball-free-agents.actions';
import { FantasyBaseballFreeAgentsSelector } from '../selectors/fantasy-baseball-free-agents.selector';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballFreeAgentsFacade {
  playerList$ = select(FantasyBaseballFreeAgentsSelector.getIdList);
  freeAgentBatterStats$ = select(FantasyBaseballFreeAgentsSelector.getFreeAgentBatterStats);
  freeAgentBatterChartData$ = select(FantasyBaseballFreeAgentsSelector.getFreeAgentBatterChartData);
  freeAgentPitcherStats$ = select(FantasyBaseballFreeAgentsSelector.getFreeAgentPitcherStats);
  selectStatListFilters$ = select(FantasyBaseballFreeAgentsSelector.selectStatListFilters);
  isLoading$ = select(FantasyBaseballLeagueState.isLoading);

  constructor(private store: Store) {}

  fetchFreeAgents(leagueId: string, scoringPeriodId: string): Observable<void> {
    return this.store.dispatch(new FetchFantasyBaseballFreeAgents({ leagueId, scoringPeriodId }));
  }
}
