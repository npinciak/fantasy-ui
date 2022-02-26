import { MOCK_FASTCAST_EVENT_1 } from './fastcast-event.model.mock';
import { FastcastLeague } from './fastcast-league.model';

export const MOCK_FASTCAST_LEAGUE_1: FastcastLeague = {
  id: '41',
  uid: 's:40~l:41',
  name: 'Fastcast League 1',
  abbreviation: 'L1',
  shortName: 'League 1',
  events: [MOCK_FASTCAST_EVENT_1],
};
