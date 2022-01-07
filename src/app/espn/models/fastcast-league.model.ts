import { FastcastEvent } from './fastcast-event.model';
import { League } from './league.model';

export interface FastcastLeagueProperties extends League {
  events: FastcastEvent[];
}

export type FastcastLeague = League;
