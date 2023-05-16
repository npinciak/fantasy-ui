import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { SportsBookLeagueSpread } from '../actions/league-spread.actions';

@State({ name: SportsBookLeagueSpread.stateName })
@Injectable()
export class SportsBookLeagueStatsState extends GenericState({ idProperty: 'team', actionHandler: SportsBookLeagueSpread }) {}
