import { MLB_WEIGHTED_STATS_2021 } from '../consts/stats.const';
import { MOCK_BASEBALL_PLAYER_1, MOCK_BASEBALL_PLAYER_2 } from '../models/baseball-player.model.mock';
import { Stat } from '../models/mlb-stats.model';
import { AdvStats } from './advStats.class';

describe('Advanced Stats', () => {
  const batterStatsMock = MOCK_BASEBALL_PLAYER_1.stats['022021'];
  const advancedStatsBatter = new AdvStats(batterStatsMock);
  advancedStatsBatter.seasonConst = MLB_WEIGHTED_STATS_2021;

  const pitcherStatsMock = MOCK_BASEBALL_PLAYER_2.stats[2];
  const advancedStatsPitcher = new AdvStats(pitcherStatsMock);
  advancedStatsPitcher.seasonConst = MLB_WEIGHTED_STATS_2021;

  const additionalStats = {};
  additionalStats[Stat['3B']] = 2;
  additionalStats[Stat.IBB] = 6;
  additionalStats[Stat.K] = 8;

  const advancedStatsBatterWithMissing = new AdvStats({ ...batterStatsMock, ...additionalStats });
  advancedStatsBatterWithMissing.seasonConst = MLB_WEIGHTED_STATS_2021;

  describe('wOBA', () => {
    it('should return wOBA', () => {
      const expected = 0.28250000000000003;
      const actual = advancedStatsBatterWithMissing.wOBA;
      expect(expected).toEqual(actual);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = advancedStatsBatter.wOBA;
      expect(expected).toEqual(actual);
    });
  });

  describe('wRC', () => {
    it('should return wRC', () => {
      const expected = 1.7090173697270477;
      const actual = advancedStatsBatterWithMissing.wRC;
      expect(expected).toEqual(actual);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = advancedStatsBatter.wRC;
      expect(expected).toEqual(actual);
    });
  });

  describe('wRAA', () => {
    it('should return wRAA', () => {
      const expected = -0.4689826302729524;
      const actual = advancedStatsBatterWithMissing.wRAA;
      expect(expected).toEqual(actual);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = advancedStatsBatter.wRAA;
      expect(expected).toEqual(actual);
    });
  });

  describe('fip', () => {
    it('should return fip', () => {
      const expected = 3.5512785388127854;
      const actual = advancedStatsPitcher.fip;
      expect(expected).toEqual(actual);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = advancedStatsBatter.fip;

      expect(expected).toEqual(actual);
    });
  });

  describe('BABIP', () => {
    it('should return BABIP', () => {
      const expected = 0.2;
      const actual = advancedStatsBatterWithMissing.babip;

      expect(expected).toEqual(actual);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = advancedStatsBatter.babip;

      expect(expected).toEqual(actual);
    });
  });

  describe('weighted hits', () => {
    it('should return weighted hits', () => {
      const expected = 3.39;
      const actual = advancedStatsBatterWithMissing.weightedHits;

      expect(expected).toEqual(actual);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = advancedStatsBatter.weightedHits;

      expect(expected).toEqual(actual);
    });
  });

  describe('non hits', () => {
    it('should return non hits', () => {
      const expected = 12;
      const actual = advancedStatsBatterWithMissing.nonHits;

      expect(expected).toEqual(actual);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = advancedStatsBatter.nonHits;

      expect(expected).toEqual(actual);
    });
  });

  describe('unintentionalBB', () => {
    it('should return unintentionalBB', () => {
      const expected = -1;
      const actual = advancedStatsBatterWithMissing.unintentionalBB;

      expect(expected).toEqual(actual);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = advancedStatsBatter.unintentionalBB;

      expect(expected).toEqual(actual);
    });
  });
});
