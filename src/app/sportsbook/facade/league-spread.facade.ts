import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { SportsBookLeagueSpread } from '../actions/league-spread.actions';
import { SportsBookLeagueSpreadSelectors } from '../selectors/league-spread.selectors';

export class SportsBookLeagueSpreadFacade extends GenericFacade({
  selectorClass: SportsBookLeagueSpreadSelectors,
  actionHandler: SportsBookLeagueSpread,
}) {}
