import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { PlayerProfilerSeason } from '../models/nfl-profiler.model';

export class DfsNflProfilerQb extends GenericActions<PlayerProfilerSeason>({ stateName: 'dfsNflProfilerQb' }) {}
