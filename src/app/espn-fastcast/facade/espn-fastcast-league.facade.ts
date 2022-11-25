import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { EspnFastcastLeagueSelectors } from '../selectors/espn-fastcast-league.selectors';

@Injectable({
  providedIn: 'root',
})
export class EspnFastcastLeagueFacade {
  leagueList$ = select(EspnFastcastLeagueSelectors.getLeagueList);
}
