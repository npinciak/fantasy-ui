import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FantasySports } from '../../espn/models/espn-endpoint-builder.model';
import { SportsUiLeagueFormSelectors } from '../selectors/sports-ui-league-form.selectors';
import { Reset, SetLeagueIdValue, SetLeagueSportValue, Submit } from '../state/sports-ui-league-form.state';

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
    return this.store.dispatch(new SetLeagueIdValue({ leagueId }));
  }

  setSport(leagueSport: FantasySports): Observable<void> {
    return this.store.dispatch(new SetLeagueSportValue({ leagueSport }));
  }

  reset(): Observable<void> {
    return this.store.dispatch(new Reset());
  }

  submit(): Observable<void> {
    return this.store.dispatch(new Submit());
  }
}
