import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { ClearAndAddNflProfilerRB, name, SetNflProfilerRB } from '../actions/daily-fantasy-nfl-profiler-rb.actions';

@State({ name })
@Injectable()
export class DailyFantasyNflProfilerRBState extends GenericState({
  idProperty: 'profilerId',
  addOrUpdate: SetNflProfilerRB,
  clearAndAdd: ClearAndAddNflProfilerRB,
}) {}
