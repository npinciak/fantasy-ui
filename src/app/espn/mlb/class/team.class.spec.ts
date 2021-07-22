import { MOCK_DATA_CLASS } from '@app/@shared/helpers/testConfigs';
import * as mockleague from '@mlb/mocks/league.mock.json';
import { BaseballTeam } from './team.class';

describe('[Class] Team', () => {
  const team = MOCK_DATA_CLASS.BASEBALL_TEAM;

  it('should return teamName', () => {
    expect(team.teamName).toBe('Schrute Farms Beetdowns');
  });

  it('should return teamAbbrev', () => {
    expect(team.teamAbbrev).toBe('BEET');
  });

  it('should return logo', () => {
    expect(team.teamLogo).toBe('https://g.espncdn.com/lm-static/logo-packs/flb/At-the-Ballpark-Robb-Harskamp/Ballpark-02.svg');
  });

  // it('should return roster', () => {
  //    // expect(team.roster).toEqual([]);
  // });

  it('should return totalPoints', () => {
    expect(team.totalPoints).toBe(57);
  });

  it('should return currentRank', () => {
    expect(team.currentRank).toBe(3);
  });

  it('should return rankDiff', () => {
    expect(team.rankDiff).toBe(3);
  });

  it('should return stats', () => {
    const expected = {
      ab: 2261,
      h: 633,
      avg: 0.27996462,
      hr: 91,
      r: 360,
      rbi: 291,
      sb: 35,
      gs: 65,
      ip: 1156,
      ha: 363,
      bbi: 117,
      whip: 1.24567474,
      er: 170,
      era: 3.97058824,
      k: 393,
      w: 23,
      sv: 5,
    };

    expect(team.stats).toEqual(expected);
  });

  it('should return rotoStats', () => {
    const expected = {
      ab: 0,
      h: 0,
      avg: 10,
      hr: 7,
      r: 10,
      rbi: 9,
      sb: 5.5,
      gs: 0,
      ip: 0,
      ha: 0,
      bbi: 0,
      whip: 1,
      er: 0,
      era: 3,
      k: 4,
      w: 5.5,
      sv: 2,
    };
    expect(team.rotoStats).toEqual(expected);
  });

  it('should return totalBattingRoto', () => {
    expect(team.totalBattingRoto).toBe(41.5);
  });

  it('should return totalPitchingRoto', () => {
    expect(team.totalPitchingRoto).toBe(15.5);
  });

  it('should return liveScore', () => {
    // expect(team.liveScore).toBe(0);
  });
});
