import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { PatchFastcastLeague } from '../actions/espn-fastcast-league.actions';

@State({ name: 'espnFastcastLeagues' })
@Injectable()
export class EspnFastcastLeagueState extends GenericState({
  idProperty: 'uid',
  patchAction: PatchFastcastLeague,
}) {}
