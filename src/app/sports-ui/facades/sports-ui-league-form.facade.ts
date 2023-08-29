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
  leagueId$ = select(SportsUiLeagueFormSelectors.slices.leagueId);
  leagueIdValid$ = select(SportsUiLeagueFormSelectors.getLeagueIdValid);
  leagueSport$ = select(SportsUiLeagueFormSelectors.slices.leagueSport);
  leagueSportValid$ = select(SportsUiLeagueFormSelectors.getSportValid);
  leagueName$ = select(SportsUiLeagueFormSelectors.slices.leagueName);

  isDirty$ = select(SportsUiLeagueFormSelectors.getIsDirty);

  constructor(private store: Store) {}

  get leagueId() {
    return this.store.selectSnapshot(SportsUiLeagueFormSelectors.slices.leagueId);
  }

  setLeagueId(leagueId: string): Observable<void> {
    return this.store.dispatch(new SportsUiLeagueForm.SetLeagueIdValue({ leagueId }));
  }

  get sport() {
    return this.store.selectSnapshot(SportsUiLeagueFormSelectors.slices.leagueSport);
  }

  setSport(leagueSport: FantasySports): Observable<void> {
    return this.store.dispatch(new SportsUiLeagueForm.SetLeagueSportValue({ leagueSport }));
  }

  get name() {
    return this.store.selectSnapshot(SportsUiLeagueFormSelectors.slices.leagueName);
  }

  setName(leagueName: string): Observable<void> {
    return this.store.dispatch(new SportsUiLeagueForm.SetLeagueNameValue({ leagueName }));
  }

  reset(): Observable<void> {
    return this.store.dispatch(new SportsUiLeagueForm.Reset());
  }

  submit(): Observable<void> {
    return this.store.dispatch(new SportsUiLeagueForm.Submit());
  }
}
