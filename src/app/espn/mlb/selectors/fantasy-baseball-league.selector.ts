import { FantasyLeagueBaseSelector } from '@app/espn/state/base-league.selector';
import { FantasyBaseballLeagueState } from '../state/fantasy-baseball-league.state';

export class FantasyBaseballLeagueSelector extends FantasyLeagueBaseSelector(FantasyBaseballLeagueState) {}
