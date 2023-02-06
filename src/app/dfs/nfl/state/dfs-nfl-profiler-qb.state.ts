import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsNflProfilerQb } from '../actions/dfs-nfl-profiler-qb.actions';

@State({ name: DfsNflProfilerQb.stateName })
@Injectable()
export class DfsNflProfilerQbState extends GenericState({
  idProperty: 'rgId',
  actionHandler: DfsNflProfilerQb,
}) {}
