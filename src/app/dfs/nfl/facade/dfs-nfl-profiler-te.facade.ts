import { Injectable } from '@angular/core';
import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { DfsNflProfilerTe } from '../actions/dfs-nfl-profiler-te.actions';
import { DfsNflProfilerTESelectors } from '../selectors/dfs-nfl-profiler-te.selectors';

/** @deprecated data unavailable as of 10.5.2023 */
@Injectable({ providedIn: 'root' })
export class DfsNflProfilerTEFacade extends GenericFacade({ selectorClass: DfsNflProfilerTESelectors, actionHandler: DfsNflProfilerTe }) {}
