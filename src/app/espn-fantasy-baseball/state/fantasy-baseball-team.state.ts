import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { FantasyBaseballTeams } from '../actions/fantasy-baseball-team.actions';

@State({ name: FantasyBaseballTeams.stateName })
@Injectable()
export class FantasyBaseballTeamState extends GenericState({
  idProperty: 'id',
  actionHandler: FantasyBaseballTeams,
}) {}
