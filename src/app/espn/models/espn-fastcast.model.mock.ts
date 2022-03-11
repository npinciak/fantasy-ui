import { CompetitorsEntity, EspnClientFastcast, EventsEntity, LeaguesEntity, Situation, SportsEntity } from './espn-fastcast.model';

export const MOCK_ESPN_CLIENT_FASTCAST_COMPETITOR: CompetitorsEntity = {
  id: '',
  uid: '',
  type: '',
  order: 0,
  homeAway: '',
  score: '',
  record: '',
  logo: '',
  logoDark: '',
  winner: false,
  displayName: '',
  name: '',
  abbreviation: '',
  location: '',
  color: '',
  group: '',
};

export const MOCK_ESPN_CLIENT_FASTCAST_SITUATION: Situation = {
  lastPlay: undefined,
  down: 0,
  yardLine: 0,
  distance: 0,
  downDistanceText: '',
  shortDownDistanceText: '',
  possessionText: '',
  isRedZone: false,
  homeTimeouts: 0,
  awayTimeouts: 0,
  possession: '',
};

export const MOCK_ESPN_CLIENT_FASTCAST_EVENT: EventsEntity = {
  gamecastAvailable: false,
  playByPlayAvailable: false,
  commentaryAvailable: false,
  recent: false,
  id: '',
  competitionId: '',
  uid: '',
  date: '',
  timeValid: false,
  name: '',
  shortName: '',
  location: '',
  season: 0,
  seasonStartDate: '',
  seasonEndDate: '',
  seasonType: '',
  seasonTypeHasGroups: false,
  period: 0,
  clock: '',
  status: '',
  summary: '',
  fullStatus: undefined,
  link: '',
  competitors: [MOCK_ESPN_CLIENT_FASTCAST_COMPETITOR],
  situation: MOCK_ESPN_CLIENT_FASTCAST_SITUATION,
  priority: 0,
};

export const MOCK_ESPN_CLIENT_FASTCAST_LEAGUE: LeaguesEntity = {
  id: '',
  uid: '',
  name: '',
  abbreviation: '',
  shortName: '',
  slug: '',
  isTournament: false,
  events: [],
};

export const MOCK_ESPN_CLIENT_FASTCAST_SPORTS_ENTITY: SportsEntity = {
  id: '',
  uid: '',
  name: '',
  slug: '',
  leagues: [],
};

export const MOCK_ESPN_CLIENT_FASTCAST: EspnClientFastcast = {
  sports: [MOCK_ESPN_CLIENT_FASTCAST_SPORTS_ENTITY],
};
