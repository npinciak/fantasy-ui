import { Injectable } from '@angular/core';
import { select } from '@app/@shared/models/typed-select';
import { FantasyLeagueBaseFacade } from '@app/espn/state/base-league/base-league.facade';
import { FantasyFootballLeague } from '../actions/fantasy-football-league.actions';
import { FantasyFootballLeagueSelector } from '../selectors/fantasy-football-league.selectors';

@Injectable({
  providedIn: 'root',
})
export class FantasyFootballLeagueFacade extends FantasyLeagueBaseFacade({
  actionHandler: FantasyFootballLeague,
  selectorClass: FantasyFootballLeagueSelector,
}) {
  leagueLinkout$ = select(FantasyFootballLeagueSelector.leagueLinkout);
  scoringPeriodFilterOptions$ = select(FantasyFootballLeagueSelector.scoringPeriodFilters);
}
