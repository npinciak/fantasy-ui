import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsNflProfilerRb } from '../actions/dfs-nfl-profiler-rb.actions';

/** @deprecated data unavailable as of 10.5.2023 */
@State({ name: DfsNflProfilerRb.stateName })
@Injectable()
export class DfsNflProfilerRbState extends GenericState({
  idProperty: 'rgId',
  actionHandler: DfsNflProfilerRb,
}) {}
