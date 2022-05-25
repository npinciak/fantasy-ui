import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { PatchFastcastTeams } from '../actions/espn-fastcast-team.actions';

@State({ name: 'espnFastcastTeams' })
@Injectable()
export class EspnFastcastTeamState extends GenericState({
  idProperty: 'uid',
  patchAction: PatchFastcastTeams,
}) {}
