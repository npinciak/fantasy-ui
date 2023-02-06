import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { FastcastSports } from '../actions/espn-fastcast-sport.actions';

@State({ name: FastcastSports.stateName })
@Injectable()
export class EspnFastcastSportState extends GenericState({ idProperty: 'uid', actionHandler: FastcastSports }) {}
