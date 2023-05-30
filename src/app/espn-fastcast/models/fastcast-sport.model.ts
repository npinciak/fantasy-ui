import { EspnFastcastClient } from 'sports-ui-sdk';

export type FastcastSport = Omit<EspnFastcastClient.SportsEntity, 'leagues' | 'shortName'>;
