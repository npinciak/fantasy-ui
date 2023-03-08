import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SportsUiLeagues } from '../../sports-ui/actions/sports-ui-leagues.actions';
import { SportsUiLeaguesSelector } from '../selectors/sports-ui-leagues.selector';

@Injectable({
  providedIn: 'root',
})
export class SportsUiLeaguesFacade extends GenericFacade(SportsUiLeaguesSelector) {
  allLeagues$ = select(SportsUiLeaguesSelector.getList);

  constructor(private store: Store) {
    super();
  }

  fetchLeagues(): Observable<void> {
    return this.store.dispatch(new SportsUiLeagues.Fetch());
  }

  deleteLeague(leagueId: string): Observable<void> {
    return this.store.dispatch(new SportsUiLeagues.DeleteLeague({ leagueId }));
  }
}
