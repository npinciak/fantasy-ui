import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteEspnLeague, FetchEspnLeagues } from '../actions/espn-leagues.actions';
import { EspnLeaguesSelector } from '../selectors/espn-leagues.selector';

@Injectable({
  providedIn: 'root',
})
export class EspnLeaguesFacade extends GenericFacade(EspnLeaguesSelector) {
  constructor(private store: Store) {
    super();
  }

  allLeagues$ = select(EspnLeaguesSelector.getList);

  fetchLeagues(): Observable<void> {
    return this.store.dispatch(new FetchEspnLeagues());
  }

  deleteLeague(id: number): Observable<void> {
    return this.store.dispatch(new DeleteEspnLeague({ id }));
  }
}
