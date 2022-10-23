import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { ClearAndAddMlbPlayerSlateAttributes, SetMlbPlayerSlateAttributes } from '../actions/daily-fantasy-mlb-player-slate-attr.actions';

@State({ name: 'dailyFantasyMlbPlayerSlateAttributes' })
@Injectable()
export class DailyFantasyMlbPlayerSlateAttributeState extends GenericState({
  idProperty: 'id',
  addOrUpdate: SetMlbPlayerSlateAttributes,
  clearAndAdd: ClearAndAddMlbPlayerSlateAttributes,
}) {}
