/* eslint-disable @typescript-eslint/naming-convention */
import { Game } from '@app/modules/espn/models/mlb/class/game.class';
import { BaseballPlayer } from '@app/modules/espn/models/mlb/class/player.class';
import {
  MockGame,
  MockLeague,
  MockTeam,
  MockTransaction,
} from '@app/modules/espn/models/mlb/mocks';
import { CurrentConditions } from '@app/modules/weather/weather/models/class';
import { MockCurrentConditions } from '@app/modules/weather/weather/models/mocks';
import { BaseballTeam } from '@espn/models/mlb/class/team.class';
import { currentDate } from './date';
import { gameMap, newTeamMap } from './mapping';

const TEST_ID = {
  STAT_TOGGLE: {
    BATTING_ROTO: 'battingRoto',
    PITCHING_ROTO: 'pitchingRoto',
  },
};

const MOCK_DATA = {
  BASEBALL_PLAYER: new BaseballPlayer(MockTeam.roster.entries[0]),
  BASEBALL_TEAM: new BaseballTeam(MockTeam),
  GAME: gameMap(MockGame.events),
  BASEBALL_TEAM_MAP: newTeamMap(MockLeague.teams, MockLeague.schedule),
  // eslint-disable-next-line max-len
  CLIMACELL_REQUEST:
    'https://api.tomorrow.io/v4/timelines?fields=pressureSeaLevel,precipitationIntensity,precipitationType,precipitationProbability,temperatureApparent,temperature,humidity,dewPoint,windSpeed,windGust,windDirection,weatherCode&timesteps=current&units=imperial&timezone=est&location=40.7128,74.0060',
  LEAGUE_ID: 8675309,
  // eslint-disable-next-line max-len
  LEAGUE_REQUEST: `https://fantasy.espn.com/apis/v3/games/flb/seasons/2021/segments/0/leagues/8675309?view=mLiveScoring&view=mMatchupScore&view=mRoster&view=mScoreboard&view=mTeam`,
  ESPN_GAME_REQUEST: `https://site.api.espn.com/apis/fantasy/v2/games/flb/games?useMap=true&dates=${currentDate()}`,
  ESPN_TEAM: MockTeam,
  ESPN_LEAGUE: MockLeague,
  ESPN_EVENT: MockGame.events[0],
  ESPN_SCHEDULE: MockLeague.schedule,
  ESPN_TRANSACTION: MockTransaction,
  ESPN_UPDATE_TEAM:
    'https://fantasy.espn.com/apis/v3/games/flb/seasons/2021/segments/0/leagues/8675309/transactions',
  WEATHER_CURRENT_CONDITIONS: MockCurrentConditions,
  CURRENT_CONDITIONS_CLASS: new CurrentConditions(
    MockCurrentConditions.data.timelines[0].intervals[0].values
  ),
};

export { MOCK_DATA, TEST_ID };
