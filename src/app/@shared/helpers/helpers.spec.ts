import { gameMap, newTeamMap, rosterMap, stadiumConditionsMap, teamMap } from './mapping';
import * as mockleague from '@espn/models/mlb/mocks/league.mock.json';
import { MOCK_DATA } from './testConfigs';
import { isPitcher } from '@app/modules/espn/models/mlb/helpers';

describe('[Helpers]', () => {

    describe('TeamMap', () => {

        it('should return empty map if team size is 0', () => {
            const actual = teamMap([], mockleague.schedule);
            const expected = 0;

            expect(actual.size).toEqual(expected);
        });

        it('should return empty map if schedule size is 0', () => {
            const actual = teamMap(mockleague.teams, []);
            const expected = 0;

            expect(actual.size).toEqual(expected);
        });

        it('should return map of teams', () => {
            const actual = teamMap(mockleague.teams, mockleague.schedule);
            const expected = 1;

            expect(actual.size).toEqual(expected);
        });

        it('should return team with liveScore of 0 if no matching schedule', () => {
            const noMatchingTeam = [{
                teams: [{
                    teamId: 55,
                    totalPoints: 78,
                    totalPointsLive: 45
                }]
            }];

            const actual = teamMap(mockleague.teams, noMatchingTeam).get(6).liveScore;
            const expected = 0;

            expect(actual).toEqual(expected);
        });
    });

    describe('RosterMap', () => {

        it('should return empty map if roster size is 0', () => {
            const actual = rosterMap([]);
            const expected = 0;

            expect(actual.size).toEqual(expected);
        });

        it('should return map of teams', () => {
            const roster = teamMap(mockleague.teams, mockleague.schedule).get(6).roster;
            const actual = rosterMap(roster);
            const expected = 2;

            expect(actual.size).toEqual(expected);
        });
    });

    describe('newTeamMap', () => {

        it('should return empty map if team size is 0', () => {
            const actual = newTeamMap({}, mockleague.schedule);
            const expected = 0;
            expect(Object.values(actual).length).toEqual(expected);
        });

        it('should return empty map if schedule size is 0', () => {
            const actual = newTeamMap(mockleague.teams, []);
            const expected = 0;

            expect(Object.values(actual).length).toEqual(expected);
        });

        it('should return map of teams', () => {
            const actual = newTeamMap(mockleague.teams, mockleague.schedule);
            const expected = 1;

            expect(Object.values(actual).length).toEqual(expected);
        });

        it('should return team with liveScore of 0 if no matching schedule', () => {
            const noMatchingTeam = [{
                teams: [{
                    teamId: 55,
                    totalPoints: 78,
                    totalPointsLive: 45
                }]
            }];

            const actual = newTeamMap(mockleague.teams, noMatchingTeam)[6].liveScore;
            const expected = 0;

            expect(actual).toEqual(expected);
        });
    });

    describe('gameMap', () => {
        it('should return empty map if game size is 0', () => {
            const actual = gameMap({});
            const expected = 0;
            expect(Object.values(actual).length).toEqual(expected);
        });

        it('should return map of games', () => {
            const actual = gameMap({ [Number(MOCK_DATA.ESPN_EVENT.id)]: MOCK_DATA.ESPN_EVENT });
            const expected = 1;

            expect(Object.values(actual).length).toEqual(expected);
        });
    });


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
            const intervalValue = MOCK_DATA.WEATHER_CURRENT_CONDITIONS.data.timelines[0].intervals[0].values;
            const actual = stadiumConditionsMap({ 1: intervalValue });
            const expected = 1;

            expect(Object.values(actual).length).toEqual(expected);
        });
    });



});
