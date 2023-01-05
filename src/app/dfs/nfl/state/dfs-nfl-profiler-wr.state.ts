import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsNflProfilerWr } from '../actions/dfs-nfl-profiler-wr.actions';

@State({ name: DfsNflProfilerWr.stateName })
@Injectable()
export class DfsNflProfilerWrState extends GenericState({
  idProperty: 'rgId',
  addOrUpdate: DfsNflProfilerWr.AddOrUpdate,
  clearAndAdd: DfsNflProfilerWr.ClearAndAdd,
}) {}
