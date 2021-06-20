/* eslint-disable @typescript-eslint/naming-convention */
import { MockGame, MockLeague, MockTeam } from '@app/modules/espn/models/mlb/mocks';
import { BaseballTeam } from '@espn/models/mlb/class/team.class';
import { currentDate } from './date';
import { newTeamMap } from './mapping';

const TEST_ID = {
    STAT_TOGGLE: {
        BATTING_ROTO: 'battingRoto',
        PITCHING_ROTO: 'pitchingRoto'
    }
};

const MOCK_DATA = {
    BASEBALL_TEAM: new BaseballTeam(MockTeam),
    BASEBALL_TEAM_MAP: newTeamMap(MockLeague.teams, MockLeague.schedule),
    LEAGUE_ID: 8675309,
    // eslint-disable-next-line max-len
    LEAGUE_REQUEST: `https://fantasy.espn.com/apis/v3/games/flb/seasons/2021/segments/0/leagues/8675309?view=mLiveScoring&view=mMatchupScore&view=mRoster&view=mScoreboard&view=mTeam`,
    ESPN_GAME_REQUEST: `https://site.api.espn.com/apis/fantasy/v2/games/flb/games?useMap=true&dates=${currentDate()}`,
    ESPN_TEAM: MockTeam,
    ESPN_LEAGUE: MockLeague,
    ESPN_EVENT: MockGame.events[0],
    ESPN_SCHEDULE: MockLeague.schedule
};

const getByTestId = (testId: string) => document.querySelectorAll(`[data-test-id*=${testId}]`);

export { getByTestId, MOCK_DATA, TEST_ID };
