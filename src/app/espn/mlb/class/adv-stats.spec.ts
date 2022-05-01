import { MLB_WEIGHTED_STATS } from '../consts/stats.const';
import { MOCK_BASEBALL_PLAYER_1, MOCK_BASEBALL_PLAYER_2 } from '../models/baseball-player.model.mock';
import { Stat } from '../models/mlb-stats.model';
import { AdvStats } from './advStats.class';

describe('Advanced Stats', () => {
  const year = 2021;
  const seasonConst = MLB_WEIGHTED_STATS[year];

  const statsEntity = MOCK_BASEBALL_PLAYER_1.stats['022021'];
  const advancedStatsBatter = new AdvStats({ seasonConst, statsEntity });

  const pitcherStatsMock = MOCK_BASEBALL_PLAYER_2.stats[2];
  const advancedStatsPitcher = new AdvStats({ seasonConst, statsEntity: pitcherStatsMock });

  const additionalStats = {};
  additionalStats[Stat.TRIPLE] = 2;
  additionalStats[Stat.IBB] = 6;
  additionalStats[Stat.K] = 8;

  const advancedStatsBatterWithMissing = new AdvStats({ seasonConst, statsEntity: { ...statsEntity, ...additionalStats } });

  describe('wOBA', () => {
    it('should return wOBA', () => {
      const expected = 0.28250000000000003;
      const actual = advancedStatsBatterWithMissing.wOBA;
      expect(actual).toEqual(expected);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = advancedStatsBatter.wOBA;
      expect(actual).toEqual(expected);
    });
  });

  describe('wRC', () => {
    it('should return wRC', () => {
      const expected = 1.7090173697270477;
      const actual = advancedStatsBatterWithMissing.wRC;
      expect(actual).toEqual(expected);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = advancedStatsBatter.wRC;
      expect(actual).toEqual(expected);
    });
  });

  describe('wRAA', () => {
    it('should return wRAA', () => {
      const expected = -0.4689826302729524;
      const actual = advancedStatsBatterWithMissing.wRAA;

      expect(actual).toEqual(expected);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = advancedStatsBatter.wRAA;
      expect(actual).toEqual(expected);
    });
  });

  describe('fip', () => {
    it('should return fip', () => {
      const expected = 3.5512785388127854;
      const actual = advancedStatsPitcher.fip;
      expect(actual).toEqual(expected);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = advancedStatsBatter.fip;

      expect(actual).toEqual(expected);
    });
  });

  describe('BABIP', () => {
    it('should return BABIP', () => {
      const expected = 0.2;
      const actual = advancedStatsBatterWithMissing.babip;

      expect(actual).toEqual(expected);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = advancedStatsBatter.babip;

      expect(actual).toEqual(expected);
    });
  });

  describe('weighted hits', () => {
    it('should return weighted hits', () => {
      const expected = 3.39;
      const actual = advancedStatsBatterWithMissing.weightedHits;

      expect(actual).toEqual(expected);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = advancedStatsBatter.weightedHits;

      expect(actual).toEqual(expected);
    });
  });

  describe('non hits', () => {
    it('should return non hits', () => {
      const expected = 12;
      const actual = advancedStatsBatterWithMissing.nonHits;

      expect(actual).toEqual(expected);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = advancedStatsBatter.nonHits;

      expect(actual).toEqual(expected);
    });
  });

  describe('unintentionalBB', () => {
    it('should return unintentionalBB', () => {
      const expected = -1;
      const actual = advancedStatsBatterWithMissing.unintentionalBB;

      expect(actual).toEqual(expected);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = advancedStatsBatter.unintentionalBB;

      expect(actual).toEqual(expected);
    });
  });

  describe('no stats exist', () => {
    it('should return gracefully', () => {
      const expected = 0;
      const statsEntity = null;
      const actual = new AdvStats({ seasonConst, statsEntity }).babip;

      expect(actual).toEqual(expected);
    });
  });
});
