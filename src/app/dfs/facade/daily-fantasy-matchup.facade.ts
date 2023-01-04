import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { DailyFantasyMatchupSelectors } from '../selectors/daily-fantasy-matchup.selectors';

@Injectable({
  providedIn: 'root',
})
export class DailyFantasyMatchupFacade {
  nflMatchupTableData$ = select(DailyFantasyMatchupSelectors.getNflMatchupTableData);

  constructor() {}
}
