import { GenericActions } from '@app/@shared/generic-state/generic.actions';
import { PlayerProfilerSeason } from '../models/nfl-profiler.model';

export class DfsNflProfilerWr extends GenericActions<PlayerProfilerSeason>({ stateName: 'dfsNflProfilerWR' }) {}
