import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { ClearAndAddNflProfilerTE, name, SetNflProfilerTE } from '../actions/daily-fantasy-nfl-profiler-te.actions';

@State({ name })
@Injectable()
export class DailyFantasyNflProfilerTEState extends GenericState({
  idProperty: 'profilerId',
  addOrUpdate: SetNflProfilerTE,
  clearAndAdd: ClearAndAddNflProfilerTE,
}) {}
