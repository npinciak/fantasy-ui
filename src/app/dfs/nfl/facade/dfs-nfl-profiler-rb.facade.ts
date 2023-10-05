import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { DfsNflProfilerRb } from '../actions/dfs-nfl-profiler-rb.actions';
import { DfsNflProfilerRBSelectors } from '../selectors/dfs-nfl-profiler-rb.selectors';

/** @deprecated data unavailable as of 10.5.2023 */
@Injectable({ providedIn: 'root' })
export class DfsNflProfilerRBFacade extends GenericFacade({ selectorClass: DfsNflProfilerRBSelectors, actionHandler: DfsNflProfilerRb }) {}
