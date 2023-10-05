import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { DfsNflProfilerWr } from '../actions/dfs-nfl-profiler-wr.actions';
import { DfsNflProfilerWRSelectors } from '../selectors/dfs-nfl-profiler-wr.selectors';

@Injectable({ providedIn: 'root' })
export class DfsNflProfilerWRFacade extends GenericFacade({ selectorClass: DfsNflProfilerWRSelectors, actionHandler: DfsNflProfilerWr }) {}
