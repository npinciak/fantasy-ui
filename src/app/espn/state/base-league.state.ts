import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { FantasyLeagueBaseStateClass, FantasyLeagueBaseStateModel, INITIAL_STATE } from './base-league.model';

export function FantasyLeagueBaseState(): FantasyLeagueBaseStateClass {
  @State<FantasyLeagueBaseStateModel>({
    name: 'espnLeagueBaseState',
    defaults: INITIAL_STATE,
  })
  @Injectable()
  class EspnLeagueStateBase {}
  return EspnLeagueStateBase;
}
