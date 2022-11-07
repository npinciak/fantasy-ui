import { SportsEntity } from '@espnClient/espn-fastcast.model';

export type FastcastSport = Omit<SportsEntity, 'leagues' | 'shortName'>;
