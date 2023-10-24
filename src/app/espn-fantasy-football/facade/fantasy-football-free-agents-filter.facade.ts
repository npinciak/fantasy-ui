import { Injectable } from '@angular/core';
import { BaseFreeAgentsFilterFacade } from '@app/espn/state/base-free-agents-filter/base-free-agents-filter.facade';
import { FantasyFootballFreeAgentsFilterActions } from '../actions/fantasy-football-free-agent-filter.actions';
import { FantasyFootballFreeAgentsFilterSelector } from '../selectors/fantasy-football-free-agents-filter.selector';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballFreeAgentsFilterFacade extends BaseFreeAgentsFilterFacade(
  FantasyFootballFreeAgentsFilterActions,
  FantasyFootballFreeAgentsFilterSelector
) {}
