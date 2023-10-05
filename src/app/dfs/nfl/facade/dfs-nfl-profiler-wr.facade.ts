import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { DfsNflProfilerWr } from '../actions/dfs-nfl-profiler-wr.actions';
import { DfsNflProfilerWRSelectors } from '../selectors/dfs-nfl-profiler-wr.selectors';

/** @deprecated data unavailable as of 10.5.2023 */
@Injectable({ providedIn: 'root' })
export class DfsNflProfilerWRFacade extends GenericFacade({ selectorClass: DfsNflProfilerWRSelectors, actionHandler: DfsNflProfilerWr }) {}
