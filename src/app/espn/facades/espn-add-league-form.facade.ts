import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EspnAddLeagueFormSelectors } from '../selectors/espn-add-league-form.selectors';
import { Reset, SetLeagueIdValue, SetSportValue } from '../state/espn-add-league-form.state';

@Injectable({
  providedIn: 'root',
})
export class EspnAddLeagueFormFacade {
  leagueId$ = select(EspnAddLeagueFormSelectors.getLeagueId);
  leagueIdValid$ = select(EspnAddLeagueFormSelectors.getLeagueIdValid);
  sport$ = select(EspnAddLeagueFormSelectors.getSport);
  sportValid$ = select(EspnAddLeagueFormSelectors.getSportValid);
  isDirty$ = select(EspnAddLeagueFormSelectors.getIsDirty);

  constructor(private store: Store) {}

  setLeagueId(leagueId: string): Observable<void> {
    return this.store.dispatch(new SetLeagueIdValue({ leagueId }));
  }

  setSport(sport: string): Observable<void> {
    return this.store.dispatch(new SetSportValue({ sport }));
  }

  reset(): Observable<void> {
    return this.store.dispatch(new Reset());
  }
}
