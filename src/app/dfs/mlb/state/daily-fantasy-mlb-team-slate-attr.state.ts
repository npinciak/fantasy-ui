import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { SetMlbTeamSlateAttributes } from '../actions/daily-fantasy-mlb-team-slate-attr.actions';

@State({ name: 'dailyFantasyMlbTeamSlateAttributes' })
@Injectable()
export class DailyFantasyMlbTeamSlateAttributeState extends GenericState({
  idProperty: 'id',
  addOrUpdate: SetMlbTeamSlateAttributes,
}) {}
