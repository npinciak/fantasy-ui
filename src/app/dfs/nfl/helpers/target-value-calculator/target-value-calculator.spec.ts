import { TARGET_VALUE_CONFIGURATION_BY_POSITION_BY_SITE } from './target-value-by-position.const';
import { TargetValueCalculator } from './target-value-calculator';

describe('TargetValueCalculator', () => {
  let targetValueCalculator: TargetValueCalculator;
  let invalidPositionTargetValueCalculator: TargetValueCalculator;

  const salary = 10000;
  const position = 'QB';
  const invalidPosition = 'K';
  const dfsSite = 'draftkings';
  const fantasyPoints = 20;
  const configuration = TARGET_VALUE_CONFIGURATION_BY_POSITION_BY_SITE;

  beforeEach(() => {
    targetValueCalculator = new TargetValueCalculator({ salary, position, dfsSite, fantasyPoints, configuration });

    invalidPositionTargetValueCalculator = new TargetValueCalculator({
      salary,
      position: invalidPosition,
      dfsSite,
      fantasyPoints,
      configuration,
    });
  });

  describe('valueTargetGPPs', () => {
    it('should return the correct value', () => {
      expect(targetValueCalculator.valueTargetGPPs).toEqual(40);
    });

    it('should return null if position is invalid', () => {
      expect(invalidPositionTargetValueCalculator.valueTargetGPPs).toBeNull();
    });
  });

  describe('valueTargetCash', () => {
    it('should return the correct value', () => {
      expect(targetValueCalculator.valueTargetCash).toEqual(30);
    });
  });

  describe('targetValueDiffGPPs', () => {
    it('should return the correct value', () => {
      expect(targetValueCalculator.targetValueDiffGPPs).toEqual(20);
    });

    it('should return null if position is invalid', () => {
      expect(invalidPositionTargetValueCalculator.targetValueDiffGPPs).toBeNull();
    });
  });

  describe('targetValueDiffCash', () => {
    it('should return the correct value', () => {
      expect(targetValueCalculator.targetValueDiffCash).toEqual(10);
    });
  });
});
