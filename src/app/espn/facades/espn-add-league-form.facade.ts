import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FantasySports } from '../models/espn-endpoint-builder.model';
import { EspnAddLeagueFormSelectors } from '../selectors/espn-add-league-form.selectors';
import { Reset, SetLeagueIdValue, SetLeagueSportValue, Submit } from '../state/espn-add-league-form.state';

@Injectable({
  providedIn: 'root',
})
export class EspnAddLeagueFormFacade {
  leagueId$ = select(EspnAddLeagueFormSelectors.getLeagueId);
  leagueIdValid$ = select(EspnAddLeagueFormSelectors.getLeagueIdValid);
  leagueSport$ = select(EspnAddLeagueFormSelectors.getSport);
  leagueSportValid$ = select(EspnAddLeagueFormSelectors.getSportValid);
  isDirty$ = select(EspnAddLeagueFormSelectors.getIsDirty);

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
