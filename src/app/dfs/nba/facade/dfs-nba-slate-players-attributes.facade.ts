import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { DfsNbaSlatePlayerAttributes } from '../actions/dfs-nba-slate-players-attributes.actions';
import { DfsNbaSlatePlayerAttributesSelectors } from '../selectors/dfs-nba-slate-players-attributes.selectors';

@Injectable({ providedIn: 'root' })
export class DfsNbaSlatePlayerAttributesFacade extends GenericFacade({
  selectorClass: DfsNbaSlatePlayerAttributesSelectors,
  actionHandler: DfsNbaSlatePlayerAttributes,
}) {}
