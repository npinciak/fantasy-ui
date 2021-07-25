import { MOCK_DATA_CLASS, MOCK_DATA_ESPN } from '@app/@shared/helpers/testConfigs';
import * as mockleague from '@mlb/mocks/league.mock.json';
import { MLB_LINEUP } from '../consts';
import { BaseballTeam } from './baseballTeam.class';

describe('[Class] Player', () => {
  const actual = MOCK_DATA_CLASS.BASEBALL_PLAYER_HEALTHY;
  const expected = MOCK_DATA_ESPN.ESPN_TEAM.roster.entries[2];

  it('should return player name', () => {
    expect(actual.name).toBe(expected.playerPoolEntry.player.fullName);
  });

  it('should return player id', () => {
    expect(actual.id).toBe(expected.playerId);
  });

  it('should return if player is injured', () => {
    expect(actual.isInjured).toBe(expected.playerPoolEntry.player.injured);
  });

  it('should return player injury status', () => {
    expect(actual.injuryStatus).toBe(expected.playerPoolEntry.player.injuryStatus);
  });

  it('should return playear headshot', () => {
    const img = `https://a.espncdn.com/combiner/i?img=/i/headshots/mlb/players/full/${expected.playerId}.png&w=96&h=70&cb=1`;
    expect(actual.playerImg).toBe(img);
  });

  it('should return players lineup slot', () => {
    expect(actual.lineupSlot).toBe(MLB_LINEUP[expected.lineupSlotId]);
  });

  it('should return players position', () => {
    expect(actual.defaultPosition).toBe('CF', 'typeof String');
    expect(actual.defaultPosition).toBe('CF');
  });

  describe('proTeam', () => {
    it('should return team', () => {
      expect(actual.proTeam).toBe('LAA', 'typeof String');
      expect(actual.proTeam).toBe('LAA');
    });
  });

  describe('isStarting', () => {
    it('should get/set starting status', () => {
      actual.isStarting = true;
      expect(actual.isStarting).toBe(true);
    });
  });

  describe('playerOwnership', () => {
    it('should return ownership percentage', () => {
      expect(actual.playerOwnership.percentOwned).toBe(expected.playerPoolEntry.player.ownership.percentOwned);
    });

    it('should return ownership change', () => {
      expect(actual.playerOwnership.change).toBe(expected.playerPoolEntry.player.ownership.percentChange);
    });
  });

  describe('playerRatings', () => {
    it('should return rating percentage', () => {
      expect(actual.playerRatings).toBe(expected.playerPoolEntry.ratings);
    });
  });

  describe('eligibleSlots', () => {
    // it('should set eligible positions', () => {
    //     actual.eligibleSlots = expected.playerPoolEntry.player.eligibleSlots;
    //     const expectedObj = { 5: 5, 9: 9, 12: 12, 16: 16, 17: 17 };
    //     expect(actual.eligibleLineupSlots).toEqual(expectedObj);
    // });
  });

  describe('isPitcher', () => {
    // it('should return true', () => {
    //     actual.eligibleSlots = expected.playerPoolEntry.player.eligibleSlots;
    //     const getPitcher = actual.isPitcher;
    //     expect(getPitcher).toEqual(true);
    // });
    // it('should return false', () => {
    //     actual.eligibleSlots = [3, 4, 7];
    //     const getPitcher = actual.isPitcher;
    //     expect(getPitcher).toEqual(false);
    // });
  });
});
