import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { DfsNbaSlatePlayerAttributesSelectors } from '../selectors/dfs-nba-slate-players-attributes.selectors';

@Injectable({ providedIn: 'root' })
export class DfsNbaSlatePlayerAttributesFacade extends GenericFacade(DfsNbaSlatePlayerAttributesSelectors) {}
