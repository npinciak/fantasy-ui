import { EspnFastcastClient } from 'sports-ui-sdk/lib/models/espn-fastcast.model';

export type FastcastSport = Omit<EspnFastcastClient.SportsEntity, 'leagues' | 'shortName'>;
