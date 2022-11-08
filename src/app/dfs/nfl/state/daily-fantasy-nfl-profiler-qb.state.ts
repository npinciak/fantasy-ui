import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { ClearAndAddNflProfilerQB, name, SetNflProfilerQB } from '../actions/daily-fantasy-nfl-profiler-qb.actions';

@State({ name })
@Injectable()
export class DailyFantasyNflProfilerQBState extends GenericState({
  idProperty: 'rgId',
  addOrUpdate: SetNflProfilerQB,
  clearAndAdd: ClearAndAddNflProfilerQB,
}) {}
