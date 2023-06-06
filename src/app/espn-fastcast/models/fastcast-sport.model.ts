import { EspnFastcastClient } from '@sports-ui/ui-sdk/espn';

export type FastcastSport = Omit<EspnFastcastClient.SportsEntity, 'leagues' | 'shortName'>;
