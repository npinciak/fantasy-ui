import { MOCK_BASEBALL_STATS_ENTITY } from '@sports-ui/ui-sdk/espn';
import { AdvStats } from './advStats.class';

describe('Advanced Stats', () => {
  const seasonConst = {
    wOBA: 1,
    wOBAScale: 1,
    wBB: 1,
    wHBP: 1,
    w1B: 1,
    w2B: 1,
    w3B: 1,
    wHR: 1,
    runSB: 1,
    runCS: -1,
    'R/PA': 1,
    'R/W': 1,
    cFIP: 1,
  };

  const statsEntity = MOCK_BASEBALL_STATS_ENTITY;
  const advancedStats = new AdvStats({ seasonConst, statsEntity });

  const advancedStatsPitcher = advancedStats;

  const additionalStats = {};

  const advancedStatsWithMissing = new AdvStats({ seasonConst, statsEntity: { ...statsEntity, ...additionalStats } });

  describe('wOBA', () => {
    it('should return wOBA', () => {
      const expected = 0.2904166666666667;
      const actual = advancedStatsWithMissing.wOBA;
      expect(actual).toEqual(expected);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = advancedStats.wOBA;
      expect(actual).toEqual(expected);
    });
  });

  describe('wRC', () => {
    it('should return wRC', () => {
      // const expected = 1.7090173697270477;
      // const actual = advancedStatsBatterWithMissing.wRC;
      // expect(actual).toEqual(expected);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = advancedStats.wRC;
      expect(actual).toEqual(expected);
    });
  });

  describe('wRAA', () => {
    it('should return wRAA', () => {
      const expected = -0.21477794793261798;
      const actual = advancedStatsWithMissing.wRAA;
      expect(actual).toEqual(expected);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = advancedStats.wRAA;
      expect(actual).toEqual(expected);
    });
  });

  describe('fip', () => {
    it('should return fip', () => {
      const expected = 4.278980597035392;
      const actual = advancedStatsPitcher.fip;
      expect(actual).toEqual(expected);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = { ...advancedStats };
      expect(actual).toEqual(expected);
    });
  });

  describe('BABIP', () => {
    it('should return BABIP', () => {
      const expected = 0;
      const actual = advancedStatsWithMissing.babip;
      expect(actual).toEqual(expected);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = advancedStats.babip;
      expect(actual).toEqual(expected);
    });
  });

  describe('weighted hits', () => {
    it('should return weighted hits', () => {
      const expected = 3.4850000000000003;
      const actual = advancedStatsWithMissing.weightedHits;

      expect(actual).toEqual(expected);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = advancedStats.weightedHits;

      expect(actual).toEqual(expected);
    });
  });

  describe('non hits', () => {
    it('should return non hits', () => {
      const expected = 12;
      const actual = advancedStatsWithMissing.nonHits;

      expect(actual).toEqual(expected);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = advancedStats.nonHits;

      expect(actual).toEqual(expected);
    });
  });

  describe('unintentionalBB', () => {
    it('should return unintentionalBB', () => {
      const expected = -1;
      const actual = advancedStatsWithMissing.unintentionalBB;

      expect(actual).toEqual(expected);
    });

    it('should return 0 if invalid properties', () => {
      const expected = 0;
      const actual = advancedStats.unintentionalBB;

      expect(actual).toEqual(expected);
    });
  });

  describe('no stats exist', () => {
    it('should return gracefully', () => {
      // const expected = 0;
      // const statsEntity = undefined;
      // const actual = new AdvStats({ seasonConst, statsEntity }).babip;
      // expect(actual).toEqual(expected);
    });
  });
});
