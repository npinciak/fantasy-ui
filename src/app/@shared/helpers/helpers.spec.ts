import { stadiumConditionsMap } from './mapping';
import * as mockleague from '@mlb/mocks/league.mock.json';
import { MOCK_DATA_CLIMA, MOCK_DATA_ESPN } from './testConfigs';
import { isPitcher } from '@mlb/helpers';
import { BaseballPlayer } from '@app/espn/mlb/class/player.class';
import { BaseballPlayerMap } from '@app/espn/mlb/state/mlb-state.model';

describe('[Helpers]', () => {
  // describe('RosterMap', () => {
  //   it('should return empty map if roster size is 0', () => {
  //     const expected = {};

  //     const actual = rosterMap([]);

  //     expect(actual).toEqual(expected);
  //   });

  //   it('should return map of roster', () => {
  //     const p1 = MOCK_DATA_ESPN.ESPN_TEAM.roster.entries[0].playerId;
  //     const p2 = MOCK_DATA_ESPN.ESPN_TEAM.roster.entries[1].playerId;

  //     const expected: BaseballPlayerMap = {
  //       [p1]: new BaseballPlayer(MOCK_DATA_ESPN.ESPN_TEAM.roster.entries[0]),
  //       [p2]: new BaseballPlayer(MOCK_DATA_ESPN.ESPN_TEAM.roster.entries[1]),
  //     }; //MOCK_DATA.BASEBALL_ROSTER;

  //     // const actual = rosterMap(MOCK_DATA.ESPN_TEAM.roster.entries);

  //     // console.log('expected: ', expected, expected[p2]);
  //     // console.log('actual: ', actual);

  //     // expect(actual).toEqual(expected);
  //   });
  // });

  // describe('newTeamMap', () => {
  //   it('should return empty map if team size is 0', () => {
  //     const actual = newTeamMap({}, mockleague.schedule);
  //     const expected = 0;
  //     expect(Object.values(actual).length).toEqual(expected);
  //   });

  //   it('should return empty map if schedule size is 0', () => {
  //     const actual = newTeamMap(mockleague.teams, []);
  //     const expected = 0;

  //     expect(Object.values(actual).length).toEqual(expected);
  //   });

  //   it('should return map of teams', () => {
  //     const actual = newTeamMap(mockleague.teams, mockleague.schedule);
  //     const expected = 1;

  //     expect(Object.values(actual).length).toEqual(expected);
  //   });

  //   it('should return team with liveScore of 0 if no matching schedule', () => {
  //     const noMatchingTeam = [
  //       {
  //         teams: [
  //           {
  //             teamId: 55,
  //             totalPoints: 78,
  //             totalPointsLive: 45,
  //           },
  //         ],
  //       },
  //     ];

  //     const actual = newTeamMap(mockleague.teams, noMatchingTeam)[6].liveScore;
  //     const expected = 0;

  //     expect(actual).toEqual(expected);
  //   });
  // });

  // describe('gameMap', () => {
  //   it('should return empty map if game size is 0', () => {
  //     const actual = gameMap({});
  //     const expected = 0;
  //     expect(Object.values(actual).length).toEqual(expected);
  //   });

  //   it('should return map of games', () => {
  //     const actual = gameMap({
  //       [Number(MOCK_DATA_ESPN.ESPN_EVENT.id)]: MOCK_DATA_ESPN.ESPN_EVENT,
  //     });
  //     const expected = 1;

  //     expect(Object.values(actual).length).toEqual(expected);
  //   });
  // });

  describe('isPitcher', () => {
    it('should return true', () => {
      const actual = isPitcher({ 13: 13 });
      expect(actual).toEqual(true);
    });

    it('should return false', () => {
      const actual = isPitcher({ 3: 3, 4: 4, 7: 7 });
      expect(actual).toEqual(false);
    });
  });

  describe('stadiumConditionsMap', () => {
    it('should return empty map if conditions size is 0', () => {
      const actual = stadiumConditionsMap({});
      const expected = 0;
      expect(Object.values(actual).length).toEqual(expected);
    });

    it('should return map of conditions', () => {
      const intervalValue = MOCK_DATA_CLIMA.WEATHER_CURRENT_CONDITIONS.data.timelines[0].intervals[0].values;
      const actual = stadiumConditionsMap({ 1: intervalValue });
      const expected = 1;

      expect(Object.values(actual).length).toEqual(expected);
    });
  });
});
