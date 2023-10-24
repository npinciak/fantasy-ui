import { BaseFreeAgentsFilterSelector } from '@app/espn/state/base-free-agents-filter/base-free-agents-filter.selectors';
import { FantasyFootballFreeAgentsFilterState } from '../state/fantasy-football-free-agents-filter.state';

export class FantasyFootballFreeAgentsFilterSelector extends BaseFreeAgentsFilterSelector(FantasyFootballFreeAgentsFilterState) {}
