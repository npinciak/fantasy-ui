import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { PatchFantasyBaseballTeams } from '../actions/fantasy-baseball-team.actions';

@State({ name: 'fantasyBaseballTeams' })
@Injectable()
export class FantasyBaseballTeamState extends GenericState({
  idProperty: 'id',
  patchAction: PatchFantasyBaseballTeams,
}) {}
