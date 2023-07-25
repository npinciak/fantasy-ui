import { SportsEntity } from '@sports-ui/ui-sdk/espn-fastcast-client';

export type FastcastSport = Omit<SportsEntity, 'leagues' | 'shortName'>;
