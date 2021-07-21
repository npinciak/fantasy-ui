/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Game } from '@mlb/class/game.class';
import { BaseballPlayer } from '@mlb/class/player.class';
import { MockGame, MockLeague, MockPlayer, MockTeam, MockTransaction } from '@mlb/mocks';
import { CurrentConditions } from '@espn/weather/weather/models/class';
import { MockCurrentConditions } from '@espn/weather/weather/models/mocks';
import { BaseballTeam } from '@mlb/class/team.class';
import { currentDate } from './date';
import { BaseballGameMap, BaseballPlayerMap, BaseballTeamMap } from '@app/espn/mlb/state/mlb-state.model';
import { EspnClientEvent, EspnClientLeague, EspnClientTeam } from '@app/espn/mlb/interface';

interface MockDataMaps {
  BASEBALL_PLAYER_MAP: BaseballPlayerMap;
  BASEBALL_TEAM_MAP: BaseballTeamMap;
  BASEBALL_GAME_MAP: BaseballGameMap;
}

interface MockDataClass {
  BASEBALL_PLAYER: BaseballPlayer;
  BASEBALL_TEAM: BaseballTeam;
  BASEBALL_GAME: Game;
  CURRENT_CONDITIONS: CurrentConditions;
}

interface MockDataEspn {
  ESPN_LEAGUE_ID: number;
  ESPN_LEAGUE_REQUEST: string;
  ESPN_UPDATE_TEAM_REQUEST: string;
  ESPN_GAME_REQUEST: string;
  ESPN_TEAM: EspnClientTeam;
  ESPN_LEAGUE: EspnClientLeague;
  ESPN_EVENT: EspnClientEvent;
  ESPN_SCHEDULE: unknown;
  ESPN_TRANSACTION: unknown;
}

const MOCK_DATA_ESPN: MockDataEspn = {
  ESPN_LEAGUE_ID: 8675309,
  ESPN_UPDATE_TEAM_REQUEST: 'https://fantasy.espn.com/apis/v3/games/flb/seasons/2021/segments/0/leagues/8675309/transactions',
  ESPN_LEAGUE_REQUEST: `https://fantasy.espn.com/apis/v3/games/flb/seasons/2021/segments/0/leagues/8675309?view=mLiveScoring&view=mMatchupScore&view=mRoster&view=mScoreboard&view=mTeam`,
  ESPN_GAME_REQUEST: `https://site.api.espn.com/apis/fantasy/v2/games/flb/games?useMap=true&dates=${currentDate()}`,
  ESPN_TEAM: MockTeam,
  ESPN_LEAGUE: MockLeague,
  ESPN_EVENT: MockGame.events[0],
  ESPN_SCHEDULE: MockLeague.schedule,
  ESPN_TRANSACTION: MockTransaction,
};

const MOCK_DATA_CLIMA = {
  WEATHER_CURRENT_CONDITIONS: MockCurrentConditions,
  CLIMACELL_REQUEST:
    // eslint-disable-next-line max-len
    'https://api.tomorrow.io/v4/timelines?fields=pressureSeaLevel,precipitationIntensity,precipitationType,precipitationProbability,temperatureApparent,temperature,humidity,dewPoint,windSpeed,windGust,windDirection,weatherCode&timesteps=current&units=imperial&timezone=est&location=40.7128,74.0060',
};

const MOCK_DATA_CLASS: MockDataClass = {
  BASEBALL_PLAYER: new BaseballPlayer(MOCK_DATA_ESPN.ESPN_TEAM.roster.entries[0]),
  BASEBALL_TEAM: new BaseballTeam(MOCK_DATA_ESPN.ESPN_TEAM),
  BASEBALL_GAME: new Game(MOCK_DATA_ESPN.ESPN_EVENT),
  CURRENT_CONDITIONS: new CurrentConditions(MOCK_DATA_CLIMA.WEATHER_CURRENT_CONDITIONS.data.timelines[0].intervals[0].values),
};

const MOCK_DATA_MAPS: MockDataMaps = {
  BASEBALL_PLAYER_MAP: { [MOCK_DATA_CLASS.BASEBALL_PLAYER.id]: MOCK_DATA_CLASS.BASEBALL_PLAYER },
  BASEBALL_TEAM_MAP: { [MOCK_DATA_CLASS.BASEBALL_TEAM.teamId]: MOCK_DATA_CLASS.BASEBALL_TEAM },
  BASEBALL_GAME_MAP: { [MOCK_DATA_CLASS.BASEBALL_GAME.gameId]: MOCK_DATA_CLASS.BASEBALL_GAME },
};

export { MOCK_DATA_ESPN, MOCK_DATA_CLIMA, MOCK_DATA_CLASS, MOCK_DATA_MAPS };
