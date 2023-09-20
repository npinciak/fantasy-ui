import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { DfsNflProfilerRb } from '../actions/dfs-nfl-profiler-rb.actions';
import { DfsNflProfilerRBSelectors } from '../selectors/dfs-nfl-profiler-rb.selectors';

export class DfsNflProfilerRBFacade extends GenericFacade({ selectorClass: DfsNflProfilerRBSelectors, actionHandler: DfsNflProfilerRb }) {}
