import { FastcastEvent } from './fastcast-event.model';
import { League } from './league.model';

export interface FastcastLeagueProperties {
  events: FastcastEvent[];
}

export type FastcastLeague = FastcastLeagueProperties & League;
