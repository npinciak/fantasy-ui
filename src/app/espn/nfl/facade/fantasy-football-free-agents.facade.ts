import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { FantasyFootballFreeAgentsSelectors } from '../selectors/fantasy-football-free-agents.selectors';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballFreeAgentsFacade extends GenericFacade(FantasyFootballFreeAgentsSelectors) {
  getFreeAgentsStats$ = select(FantasyFootballFreeAgentsSelectors.getFreeAgentsStats);
}
