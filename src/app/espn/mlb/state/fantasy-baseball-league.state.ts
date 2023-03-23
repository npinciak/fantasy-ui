import { Injectable } from '@angular/core';
import { FantasyLeagueBaseState } from '@app/espn/state/base-league.state';
import { State } from '@ngxs/store';
import { FantasyBaseballLeague } from '../actions/fantasy-baseball-league.actions';

@State({ name: FantasyBaseballLeague.stateName })
@Injectable()
export class FantasyBaseballLeagueState extends FantasyLeagueBaseState({ actionHandler: FantasyBaseballLeague }) {}
