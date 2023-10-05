import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsNflProfilerQb } from '../actions/dfs-nfl-profiler-qb.actions';

/** @deprecated data unavailable as of 10.5.2023 */
@State({ name: DfsNflProfilerQb.stateName })
@Injectable()
export class DfsNflProfilerQbState extends GenericState({
  idProperty: 'rgId',
  actionHandler: DfsNflProfilerQb,
}) {}
