import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { FantasyFootballFreeAgentActions } from '../actions/fantasy-football-free-agent.actions';

@State({ name: FantasyFootballFreeAgentActions.stateName })
@Injectable()
export class FantasyFootballFreeAgentsState extends GenericState({
  idProperty: 'id',
  actionHandler: FantasyFootballFreeAgentActions,
}) {}
