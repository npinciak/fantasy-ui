import { Injectable } from '@angular/core';

import { BaseFreeAgentsFilterState } from '@app/espn/state/base-free-agents-filter.state';
import { State } from '@ngxs/store';
import { FantasyFootballFreeAgentsFilterActions } from '../actions/fantasy-football-free-agent-filter.actions';

@State({ name: FantasyFootballFreeAgentsFilterActions.stateName })
@Injectable()
export class FantasyFootballFreeAgentsFilterState extends BaseFreeAgentsFilterState({
  actionHandler: FantasyFootballFreeAgentsFilterActions,
}) {}
