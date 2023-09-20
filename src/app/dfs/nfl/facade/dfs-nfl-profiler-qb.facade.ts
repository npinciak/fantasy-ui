import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { DfsNflProfilerQb } from '../actions/dfs-nfl-profiler-qb.actions';
import { DfsNflProfilerQBSelectors } from '../selectors/dfs-nfl-profiler-qb.selectors';

export class DfsNflProfilerQBFacade extends GenericFacade({ selectorClass: DfsNflProfilerQBSelectors, actionHandler: DfsNflProfilerQb }) {}
