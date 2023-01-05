import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { PlayerProfilerSeason } from '../models/nfl-profiler.model';

export class DfsNflProfilerRb extends GenericActions<PlayerProfilerSeason>({ stateName: 'dfsNflProfilerRb' }) {}
