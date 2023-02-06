import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsNbaSlatePlayerAttributes } from '../actions/dfs-nba-slate-players-attributes.actions';

@State({ name: DfsNbaSlatePlayerAttributes.stateName })
@Injectable()
export class DfsNbaSlatePlayerAttributesState extends GenericState({
  idProperty: 'id',
  actionHandler: DfsNbaSlatePlayerAttributes,
}) {}
