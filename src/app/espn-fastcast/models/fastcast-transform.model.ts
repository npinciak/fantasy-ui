import { FastcastEvent } from './fastcast-event.model';
import { FastcastLeague } from './fastcast-league.model';
import { FastcastSport } from './fastcast-sport.model';
import { FastcastEventTeam } from './fastcast-team.model';

export interface FastcastTransform {
  sports: FastcastSport[];
  leagues: FastcastLeague[];
  events: FastcastEvent[];
  teams: FastcastEventTeam[];
}
