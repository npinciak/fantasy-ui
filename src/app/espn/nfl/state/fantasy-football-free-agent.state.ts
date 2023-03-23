import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { FantasyFootballFreeAgent } from '../actions/fantasy-football-free-agent.actions';

@State({ name: FantasyFootballFreeAgent.stateName })
@Injectable()
export class FantasyFootballFreeAgentState extends GenericState({
  idProperty: 'id',
  actionHandler: FantasyFootballFreeAgent,
}) {}
