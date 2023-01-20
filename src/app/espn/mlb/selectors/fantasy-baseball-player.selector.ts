import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { FantasyBaseballPlayerNewsState } from '../state/fantasy-baseball-player.state';

export class FantasyBaseballPlayerSelector extends GenericSelector(FantasyBaseballPlayerNewsState) {}
