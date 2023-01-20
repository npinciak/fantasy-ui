import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { FantasyBaseballTeamsLive } from '../actions/fantasy-baseball-team-live.actions';

@State({ name: FantasyBaseballTeamsLive.stateName })
@Injectable()
export class FantasyBaseballTeamsLiveState extends GenericState({
  idProperty: 'id',
  addOrUpdate: FantasyBaseballTeamsLive.AddOrUpdate,
  clearAndAdd: FantasyBaseballTeamsLive.ClearAndAdd,
}) {}
