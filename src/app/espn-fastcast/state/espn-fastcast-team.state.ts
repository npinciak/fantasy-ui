import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { FastcastTeams } from '../actions/espn-fastcast-team.actions';

@State({ name: FastcastTeams.stateName })
@Injectable()
export class EspnFastcastTeamState extends GenericState({ idProperty: 'uid', actionHandler: FastcastTeams }) {}
