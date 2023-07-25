import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SportsUiTeams } from '../actions/sports-ui-teams.actions';
import { SportsUiTeamsSelector } from '../selectors/sports-ui-teams.selector';
@Injectable({
  providedIn: 'root',
})
export class SportsUiTeamsFacade extends GenericFacade({ selectorClass: SportsUiTeamsSelector, actionHandler: SportsUiTeams }) {
  allLeagues$ = select(SportsUiTeamsSelector.getList);

  constructor(private store: Store) {
    super();
  }

  fetchTeams(): Observable<void> {
    return this.store.dispatch(new SportsUiTeams.Fetch());
  }
}
