import { Injectable } from '@angular/core';
import { EspnFantasyLeagueGenericState } from '@app/espn/state/espn-fantasy-league-generic.state';

@Injectable()
export class FantasyBaseballLeagueStateLive extends EspnFantasyLeagueGenericState({
  name: 'fantasyBasballLeagueLiveScoring',
}) {}
