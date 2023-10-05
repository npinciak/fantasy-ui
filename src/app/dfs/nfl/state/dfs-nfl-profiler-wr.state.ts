import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsNflProfilerWr } from '../actions/dfs-nfl-profiler-wr.actions';

/** @deprecated data unavailable as of 10.5.2023 */
@State({ name: DfsNflProfilerWr.stateName })
@Injectable()
export class DfsNflProfilerWrState extends GenericState({
  idProperty: 'rgId',
  actionHandler: DfsNflProfilerWr,
}) {}
