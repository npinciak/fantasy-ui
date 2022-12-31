import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DailyFantasyMatchups } from '../actions/daily-fantasy-matchup.actions';

@State({ name: DailyFantasyMatchups.stateName })
@Injectable()
export class DailyFantasyMatchupState extends GenericState({
  idProperty: 'id',
  addOrUpdate: DailyFantasyMatchups.AddOrUpdate,
  clearAndAdd: DailyFantasyMatchups.ClearAndAdd,
}) {}
