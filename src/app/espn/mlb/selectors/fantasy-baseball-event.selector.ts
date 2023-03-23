import { GenericSelector } from '@app/@shared/generic-state/generic.selector';
import { FantasyBaseballEventsState } from '../state/fantasy-baseball-events.state';

export class FantasyBaseballEventSelector extends GenericSelector(FantasyBaseballEventsState) {}
