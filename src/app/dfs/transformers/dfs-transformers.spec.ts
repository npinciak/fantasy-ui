import { DfsSlatePlayer } from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client';
import {
  MOCK_CLIENT_GRIDIRON_PLAYER,
  MOCK_CLIENT_GRIDIRON_PLAYER_NULL,
  MOCK_CLIENT_SCHEDULE,
  MOCK_DFS_SLATE_PLAYER,
  MOCK_SCHEDULE_HOME_TEAM,
} from '@sports-ui/daily-fantasy-sdk/daily-fantasy-client/mocks';
import { SlatePlayer } from '../models/player.model';
import { MOCK_SCHEDULE } from '../models/schedule.mock';
import { SLATE_PLAYER_MOCK } from '../models/slate-player.mock';
import { MOCK_HOME_TEAM } from '../models/team.mock';
import { MOCK_GRIDIRON_PLAYER, MOCK_GRIDIRON_PLAYER_NULL } from '../nfl/models/nfl-gridIron.mock';
import {
  convertObjectValuesToNumbers,
  normalizeNFLClientGridIronPlayer,
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

  describe('#normalizeNFLClientGridIronPlayer', () => {
    it('should return null when PLAYERID does not exist', () => {
      const gridIronPlayer = { ...MOCK_CLIENT_GRIDIRON_PLAYER, PLAYERID: null };
      const result = normalizeNFLClientGridIronPlayer(gridIronPlayer);
      expect(result).toBeNull();
    });

    it('should normalize the player data', () => {
      const gridIronPlayer = MOCK_CLIENT_GRIDIRON_PLAYER;
      const expected = MOCK_GRIDIRON_PLAYER;
      const result = normalizeNFLClientGridIronPlayer(gridIronPlayer);
      expect(result).toEqual(expected);
    });

    it('should handle missing properties gracefully', () => {
      const gridIronPlayer = { ...MOCK_CLIENT_GRIDIRON_PLAYER_NULL, PLAYERID: MOCK_CLIENT_GRIDIRON_PLAYER.PLAYERID };
      const expected = MOCK_GRIDIRON_PLAYER_NULL;
      const result = normalizeNFLClientGridIronPlayer(gridIronPlayer);
      expect(result).toEqual(expected);
    });
  });

  describe('#convertObjectValuesToNumbers', () => {
    it('should convert valid numeric strings to numbers', () => {
      const input = {
        passingYards: '350',
        rushingYards: '125',
        receivingYards: '80.5',
      };

      const result = convertObjectValuesToNumbers(input);

      expect(result.passingYards).toBe(350);
      expect(result.rushingYards).toBe(125);
      expect(result.receivingYards).toBe(80.5);
    });

    it('should handle invalid numeric strings by setting them to null', () => {
      const input = {
        fantasyPoints: '20.5',
        touchdowns: '2',
        fumbles: 'invalid',
      };

      const result = convertObjectValuesToNumbers(input);

      expect(result.fantasyPoints).toBe(20.5);
      expect(result.touchdowns).toBe(2);
      expect(result.fumbles).toBe(null);
    });
  });
});
