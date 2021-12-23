import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { FetchFootballLeague } from '../actions/nfl.actions';

@Injectable({
  providedIn: 'root',
})
export class NFLFacade {
  constructor(private store: Store) {}

  public getLeague(leagueId: string) {
    return this.store.dispatch(new FetchFootballLeague(leagueId));
  }
}
