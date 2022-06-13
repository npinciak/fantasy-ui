import { EspnClientCompetitor, EspnClientEvent } from '@app/espn/espn-client.model';

type CompetitorsProperties = Pick<EspnClientCompetitor, 'id' | 'abbreviation' | 'homeAway'>;

export type BaseballEvent = Pick<EspnClientEvent, 'id' | 'uid'> & {
  competitors: Record<string, CompetitorsProperties>;
};
