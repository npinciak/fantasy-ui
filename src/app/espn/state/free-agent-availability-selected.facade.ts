import { Injectable } from '@angular/core';
import { SelectedFacade } from '@app/@shared/generic-selected-state/generic-selected-facade';
import { FreeAgentAvailabilityStatusSelectedSelector } from './free-agent-availability-selected.selector';

@Injectable({ providedIn: 'root' })
export class FreeAgentAvailabilityStatusSelectedFacade extends SelectedFacade(FreeAgentAvailabilityStatusSelectedSelector) {}
