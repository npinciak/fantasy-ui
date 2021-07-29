import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Store } from '@ngxs/store';
import { FetchFootballLeague } from '../actions/nfl.actions';

@Injectable({
  providedIn: 'root',
})
export class NFLFacade {
  constructor(private store: Store) {}
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public getLeague(leagueId: number) {
    return this.store.dispatch(new FetchFootballLeague(leagueId));
  }
}
