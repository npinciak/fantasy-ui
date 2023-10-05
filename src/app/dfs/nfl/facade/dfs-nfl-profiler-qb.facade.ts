import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { DfsNflProfilerQb } from '../actions/dfs-nfl-profiler-qb.actions';
import { DfsNflProfilerQBSelectors } from '../selectors/dfs-nfl-profiler-qb.selectors';

@Injectable({ providedIn: 'root' })
export class DfsNflProfilerQBFacade extends GenericFacade({ selectorClass: DfsNflProfilerQBSelectors, actionHandler: DfsNflProfilerQb }) {}
