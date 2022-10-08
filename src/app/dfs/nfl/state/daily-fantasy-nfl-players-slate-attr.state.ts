import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import {
  ClearAndAddNflPlayerSlateAttributes,
  name,
  SetNflPlayerSlateAttributes,
} from '../actions/daily-fantasy-nfl-players-slate-attr.actions';

@State({ name })
@Injectable()
export class DailyFantasyNflPlayersSlateAttributeState extends GenericState({
  idProperty: 'id',
  addOrUpdate: SetNflPlayerSlateAttributes,
  clearAndAdd: ClearAndAddNflPlayerSlateAttributes,
}) {}
