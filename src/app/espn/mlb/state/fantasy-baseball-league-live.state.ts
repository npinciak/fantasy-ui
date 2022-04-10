import { Injectable } from '@angular/core';
import { EspnFantasyLeagueGenericState } from '@app/espn/state/espn-fantasy-league-generic.state';

@Injectable()
export class FantasyBaseballLeagueLiveState extends EspnFantasyLeagueGenericState({
  name: 'fantasyBasballLeagueLiveScoring',
}) {}
