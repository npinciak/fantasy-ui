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
  competitionIdPrevious: '',
};

export const MOCK_ESPN_CLIENT_FASTCAST_SITUATION: Situation = {
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
  balls: 0,
  strikes: 0,
  outs: 0,
  onFirst: false,
  onSecond: false,
  onThird: false,
  lastPlay: null,
  batter: {
    playerId: 0,
    summary: '',
    athlete: {
      id: '',
      fullName: '',
      displayName: '',
      shortName: '',
      headshot: '',
      jersey: '',
      position: {
        abbreviation: '',
      },
      team: {
        id: '',
        abbreviation: '',
      },
      lastName: null,
      active: true,
    },
  },
  pitcher: {
    playerId: 0,
    summary: '',
    athlete: {
      id: '',
      fullName: '',
      displayName: '',
      shortName: '',
      headshot: '',
      jersey: '',
      position: {
        abbreviation: '',
      },
      team: {
        id: '',
        abbreviation: '',
      },
      lastName: null,
      active: true,
    },
  },
};

export const MOCK_ESPN_CLIENT_FASTCAST_EVENT: EventsEntity = {
  id: '',
  competitionId: '',
  uid: '',
  date: '',
  name: '',
  shortName: '',
  location: '',
  season: 0,
  seasonType: '',
  period: 0,
  clock: '',
  status: '',
  summary: '',
  link: '',
  fullStatus: {
    type: {
      id: '1',
      state: 'post',
      completed: true,
    },
  },
  competitors: [MOCK_ESPN_CLIENT_FASTCAST_COMPETITOR],
  situation: MOCK_ESPN_CLIENT_FASTCAST_SITUATION,
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
