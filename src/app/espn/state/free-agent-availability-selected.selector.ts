import { SelectedSelector } from '@app/@shared/generic-selected-state/generic-selected-selector';
import { FreeAgentsAvailabilitySelectedState } from './free-agent-availability-selected.state';

export class FreeAgentAvailabilityStatusSelectedSelector extends SelectedSelector(FreeAgentsAvailabilitySelectedState) {}
