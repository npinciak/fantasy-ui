import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { DfsNflProfilerWr } from '../actions/dfs-nfl-profiler-wr.actions';
import { DfsNflProfilerWRSelectors } from '../selectors/dfs-nfl-profiler-wr.selectors';

export class DfsNflProfilerWRFacade extends GenericFacade({ selectorClass: DfsNflProfilerWRSelectors, actionHandler: DfsNflProfilerWr }) {}
