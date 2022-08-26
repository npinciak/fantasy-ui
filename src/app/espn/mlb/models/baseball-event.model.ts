import { EspnClientCompetitor, EspnClientEvent } from '@client/espn-client.model';

type CompetitorsProperties = Pick<EspnClientCompetitor, 'id' | 'abbreviation' | 'homeAway'>;

export type BaseballEvent = Pick<EspnClientEvent, 'id' | 'uid'> & {
  competitors: Record<string, CompetitorsProperties>;
};
