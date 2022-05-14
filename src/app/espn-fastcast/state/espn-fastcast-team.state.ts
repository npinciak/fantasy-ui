import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { PatchFastcastTeams } from '../actions/espn-fastcast-team.actions';

@Injectable()
export class EspnFastcastTeamState extends GenericState({
  name: 'espnFastcastTeams',
  idProperty: 'uid',
  patchAction: PatchFastcastTeams,
}) {}
