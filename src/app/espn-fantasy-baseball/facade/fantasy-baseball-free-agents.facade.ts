import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { FantasyBaseballFreeAgents } from '../actions/fantasy-baseball-free-agents.actions';
import { FantasyBaseballFreeAgentSelector } from '../selectors/fantasy-baseball-free-agent.selector';

@Injectable({
  providedIn: 'root',
})
export class FantasyBaseballFreeAgentsFacade {
  playerList$ = select(FantasyBaseballFreeAgentSelector.getIdList);
  freeAgentBatterStats$ = select(FantasyBaseballFreeAgentSelector.getFreeAgentBatterStats);
  freeAgentBatterChartData$ = select(FantasyBaseballFreeAgentSelector.getFreeAgentBatterChartData);

  freeAgentPitcherStats$ = select(FantasyBaseballFreeAgentSelector.getFreeAgentPitcherStats);
  freeAgentPitcherChartData$ = select(FantasyBaseballFreeAgentSelector.getFreeAgentPitcherChartData);

  compareTeamAndFreeAgentBatterList$ = select(FantasyBaseballFreeAgentSelector.getCompareTeamAndFreeAgentBatterList);
  compareTeamAndFreeAgentPitcherList$ = select(FantasyBaseballFreeAgentSelector.getCompareTeamAndFreeAgentPitcherList);

  constructor(private store: Store) {}

  fetch(leagueId: string) {
    this.store.dispatch([new FantasyBaseballFreeAgents.Fetch({ leagueId })]);
  }
}
