import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { FastcastLeagues } from '../actions/espn-fastcast-league.actions';

@State({ name: FastcastLeagues.stateName })
@Injectable()
export class EspnFastcastLeagueState extends GenericState({ idProperty: 'uid', actionHandler: FastcastLeagues }) {}
