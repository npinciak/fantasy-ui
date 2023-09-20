import { GenericFacade } from '@app/@shared/generic-state/generic.facade';
import { DfsNflProfilerTe } from '../actions/dfs-nfl-profiler-te.actions';
import { DfsNflProfilerTESelectors } from '../selectors/dfs-nfl-profiler-te.selectors';

export class DfsNflProfilerTEFacade extends GenericFacade({ selectorClass: DfsNflProfilerTESelectors, actionHandler: DfsNflProfilerTe }) {}
