import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { select } from '@app/@shared/models/typed-select';
import { FastcastLeagues } from '../actions/espn-fastcast-league.actions';
import { EspnFastcastLeagueSelectors } from '../selectors/espn-fastcast-league.selectors';

@Injectable({
  providedIn: 'root',
})
export class EspnFastcastLeagueFacade extends GenericFacade({
  selectorClass: EspnFastcastLeagueSelectors,
  actionHandler: FastcastLeagues,
}) {
  leagueList$ = select(EspnFastcastLeagueSelectors.getLeagueList);
  dateFilterList$ = select(EspnFastcastLeagueSelectors.dateFilterList);
}
