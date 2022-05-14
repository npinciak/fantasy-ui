import { SportsEntity } from './espn-fastcast.model';

export type FastcastSport = Omit<SportsEntity, 'leagues'>;
