import { EspnFastcastClient } from 'sports-ui-sdk/lib/espn/espn.m';

export type FastcastSport = Omit<EspnFastcastClient.SportsEntity, 'leagues' | 'shortName'>;
