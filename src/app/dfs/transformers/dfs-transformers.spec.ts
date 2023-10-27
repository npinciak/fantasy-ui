import { DfsSlatePlayer } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import {
  MOCK_CLIENT_SCHEDULE,
  MOCK_DFS_SLATE_PLAYER,
  MOCK_SCHEDULE_HOME_TEAM,
} from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client/mocks';
import { SlatePlayer } from '../models/player.model';
import { MOCK_SCHEDULE } from '../models/schedule.mock';
import { SLATE_PLAYER_MOCK } from '../models/slate-player.mock';
import { MOCK_HOME_TEAM } from '../models/team.mock';
import {
  transformDfsClientPlayerToPlayer,
  transformDfsClientScheduleToSchedule,
  transformScheduleTeamEntityToTeam,
} from './dfs-transformers';

describe('Dfs Transformers', () => {
  describe('#transformDfsClientPlayerToPlayer', () => {
    it('should transform a DfsClientPlayer to a SlatePlayer with a complete name', () => {
      const dfsClientPlayer: DfsSlatePlayer = MOCK_DFS_SLATE_PLAYER;

      const expected: SlatePlayer = SLATE_PLAYER_MOCK;

      const actual = transformDfsClientPlayerToPlayer(dfsClientPlayer);

      expect(actual).toEqual(expected);
    });

    it('should transform a DfsClientPlayer to a SlatePlayer with a missing first name', () => {
      const dfsClientPlayer: DfsSlatePlayer = { ...MOCK_DFS_SLATE_PLAYER, player: { ...MOCK_DFS_SLATE_PLAYER.player, last_name: '' } };

      const expected = { ...SLATE_PLAYER_MOCK, name: MOCK_DFS_SLATE_PLAYER.player.first_name };

      const actual = transformDfsClientPlayerToPlayer(dfsClientPlayer);

      expect(actual).toEqual(expected);
    });
  });

  describe('#transformScheduleTeamEntityToTeam', () => {
    it('should transform a ScheduleTeamEntity to a Team', () => {
      const scheduleTeamEntity = MOCK_SCHEDULE_HOME_TEAM;

      const expected = MOCK_HOME_TEAM;

      const actual = transformScheduleTeamEntityToTeam(scheduleTeamEntity);

      expect(actual).toEqual(expected);
    });
  });

  describe('#transformDfsClientScheduleToSchedule', () => {
    it('should transform DfsClientSchedule to Schedule', () => {
      const schedule = MOCK_CLIENT_SCHEDULE;

      const expected = MOCK_SCHEDULE;

      const actual = transformDfsClientScheduleToSchedule(schedule);

      expect(actual).toEqual(expected);
    });
  });
});
