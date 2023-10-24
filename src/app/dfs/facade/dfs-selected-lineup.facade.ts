import { Injectable } from '@angular/core';
import { SelectedFacade } from '@app/@shared/generic-selected-state/generic-selected-facade';
import { DfsSelectedLineupSelector } from '../selectors/dfs-selected-lineup.selector';

@Injectable({
  providedIn: 'root',
})
export class DfsSelectedLineupFacade extends SelectedFacade(DfsSelectedLineupSelector) {}
