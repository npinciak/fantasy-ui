import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { PlayerProfilerSeason } from '../models/nfl-profiler.model';

/** @deprecated data unavailable as of 10.5.2023 */
export class DfsNflProfilerQb extends GenericActions<PlayerProfilerSeason>({ stateName: 'dfsNflProfilerQb' }) {}
