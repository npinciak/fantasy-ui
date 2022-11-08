import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FantasySports } from '../../espn/models/espn-endpoint-builder.model';
import { SportsUiLeagueForm } from '../actions/sports-ui-league-form.actions';
import { SportsUiLeagueFormSelectors } from '../selectors/sports-ui-league-form.selectors';

@Injectable({
  providedIn: 'root',
})
export class SportsUiLeagueFormFacade {
  leagueId$ = select(SportsUiLeagueFormSelectors.getLeagueId);
  leagueIdValid$ = select(SportsUiLeagueFormSelectors.getLeagueIdValid);
  leagueSport$ = select(SportsUiLeagueFormSelectors.getSport);
  leagueSportValid$ = select(SportsUiLeagueFormSelectors.getSportValid);
  isDirty$ = select(SportsUiLeagueFormSelectors.getIsDirty);

  constructor(private store: Store) {}

  setLeagueId(leagueId: string): Observable<void> {
    return this.store.dispatch(new SportsUiLeagueForm.SetLeagueIdValue({ leagueId }));
  }

  setSport(leagueSport: FantasySports): Observable<void> {
    return this.store.dispatch(new SportsUiLeagueForm.SetLeagueSportValue({ leagueSport }));
  }

  reset(): Observable<void> {
    return this.store.dispatch(new SportsUiLeagueForm.Reset());
  }

  submit(): Observable<void> {
    return this.store.dispatch(new SportsUiLeagueForm.Submit());
  }
}
