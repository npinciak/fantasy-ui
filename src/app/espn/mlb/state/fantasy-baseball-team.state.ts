import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { FantasyBaseballTeams } from '../actions/fantasy-baseball-team.actions';

@State({ name: FantasyBaseballTeams.name })
@Injectable()
export class FantasyBaseballTeamState extends GenericState({
  idProperty: 'id',
  addOrUpdate: FantasyBaseballTeams.AddOrUpdate,
  clearAndAdd: FantasyBaseballTeams.ClearAndAdd,
}) {}
