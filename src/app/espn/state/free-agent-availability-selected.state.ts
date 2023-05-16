import { Injectable } from '@angular/core';

import { SelectedState } from '@app/@shared/generic-selected-state/generic-selected-state';
import { GenericSelectedActions } from '@app/@shared/generic-selected-state/generic-selected.actions';
import { SelectedStateModel } from '@app/@shared/generic-selected-state/generic-selected.state.model';
import { State } from '@ngxs/store';

export class FreeAgentsAvailabilitySelectedActions extends GenericSelectedActions({
  stateName: 'freeAgentSelectedAvailabilityStatus',
}) {}

@State<SelectedStateModel>({
  name: FreeAgentsAvailabilitySelectedActions.stateName,
})
@Injectable()
export class FreeAgentsAvailabilitySelectedState extends SelectedState({
  selectedActions: FreeAgentsAvailabilitySelectedActions,
}) {}
