import { Injectable } from '@angular/core';
import { GenericState } from '@app/@shared/generic-state/generic.state';
import { State } from '@ngxs/store';
import { DfsNflProfilerTe } from '../actions/dfs-nfl-profiler-te.actions';

/** @deprecated data unavailable as of 10.5.2023 */
@State({ name: DfsNflProfilerTe.stateName })
@Injectable()
export class DfsNflProfilerTeState extends GenericState({
  idProperty: 'rgId',
  actionHandler: DfsNflProfilerTe,
}) {}
