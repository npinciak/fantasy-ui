import { EspnClientCompetitor, EspnClientEvent } from '@espnClient/espn-client.model';

type CompetitorsProps = Pick<EspnClientCompetitor, 'id' | 'abbreviation' | 'homeAway'>;

export type BaseballEvent = Pick<EspnClientEvent, 'id' | 'uid'> & {
  competitors: Record<string, CompetitorsProps>;
};
