import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { ClearAndAddFantasyBaseballTeams, SetFantasyBaseballTeams } from '../actions/fantasy-baseball-team.actions';

@State({ name: 'fantasyBaseballTeams' })
@Injectable()
export class FantasyBaseballTeamState extends GenericState({
  idProperty: 'id',
  addOrUpdate: SetFantasyBaseballTeams,
  clearAndAdd: ClearAndAddFantasyBaseballTeams,
}) {}
