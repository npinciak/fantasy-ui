import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FantasyFootballFreeAgentActions } from '../actions/fantasy-football-free-agent.actions';
import { FantasyFootballFreeAgentsSelectors } from '../selectors/fantasy-football-free-agents.selectors';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballFreeAgentsFacade extends GenericFacade({
  selectorClass: FantasyFootballFreeAgentsSelectors,
  actionHandler: FantasyFootballFreeAgentActions,
}) {
  freeAgentsStats$ = select(FantasyFootballFreeAgentsSelectors.getFreeAgentsStats);
  compareTeamAndFreeAgentList$ = select(FantasyFootballFreeAgentsSelectors.getCompareTeamAndFreeAgentList);

  constructor(private store: Store) {
    super();
  }

  fetchFreeAgents(leagueId: string): Observable<void> {
    return this.store.dispatch(new FantasyFootballFreeAgentActions.Fetch({ leagueId }));
  }
}
