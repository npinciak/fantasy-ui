import { Injectable } from '@angular/core';
import { FantasyLeagueBaseState } from '@app/espn/state/base-league/base-league.state';
import { State } from '@ngxs/store';
import { FantasyFootballLeague } from '../actions/fantasy-football-league.actions';

@State({ name: FantasyFootballLeague.stateName })
@Injectable()
export class FantasyFootballLeagueState extends FantasyLeagueBaseState({ actionHandler: FantasyFootballLeague }) {}
