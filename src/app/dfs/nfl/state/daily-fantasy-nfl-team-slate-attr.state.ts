import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { ClearAndAddNflTeamSlateAttributes, name, SetNflTeamSlateAttributes } from '../actions/daily-fantasy-nfl-team-slate-attr.actions';

@State({ name })
@Injectable()
export class DailyFantasyNflTeamSlateAttributeState extends GenericState({
  idProperty: 'id',
  addOrUpdate: SetNflTeamSlateAttributes,
  clearAndAdd: ClearAndAddNflTeamSlateAttributes,
}) {}
