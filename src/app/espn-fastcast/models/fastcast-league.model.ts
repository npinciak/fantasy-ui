import { League } from '@app/espn/models/league.model';
import { FastcastEvent } from './fastcast-event.model';

export interface FastcastLeagueProperties {
  events: FastcastEvent[];
}

export type FastcastLeague = FastcastLeagueProperties & League;
export type FastcastLeagueMap = Record<string, FastcastLeague>;
