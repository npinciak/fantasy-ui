import { Team } from '@app/espn/models/team.model';
import { CompetitorsEntity, EventsEntity } from './espn-fastcast.model';

export interface FastcastEventTeamProperties {
  score: string | null;
  abbrev: string | null;
  isWinner: boolean;
  isHome: string;
  color: string | null;
  altColor: string | null;
  rank: number | null;
  eventUid: string;
  winPct: number | null;
  hasPossession?: boolean; // TODO: remove me, moved to FastcastEvent.footballSitutation
  inRedzone?: boolean; // TODO: remove me, moved to FastcastEvent.footballSitutation
}

export type FastcastEventTeam = FastcastEventTeamProperties & Team & Pick<CompetitorsEntity, 'uid'> & Pick<EventsEntity, 'id'>;
export type FastcastEventTeamMap = Record<string, FastcastEventTeam>;
