import { TARGET_VALUE_CONFIGURATION_BY_POSITION_BY_SITE } from './target-value-by-position.const';
import { TargetValueCalculator } from './target-value-calculator';

describe('TargetValueCalculator', () => {
  let targetValueCalculator: TargetValueCalculator;

  const salary = 10000;
  const position = 'QB';
  const dfsSite = 'draftkings';
  const fantasyPoints = 20;
  const configuration = TARGET_VALUE_CONFIGURATION_BY_POSITION_BY_SITE;

  beforeEach(() => {
    targetValueCalculator = new TargetValueCalculator({ salary, position, dfsSite, fantasyPoints, configuration });
  });

  describe('valueTargetGPPs', () => {
    it('should return the correct value', () => {
      expect(targetValueCalculator.valueTargetGPPs).toEqual(40);
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
  });

  describe('targetValueDiffCash', () => {
    it('should return the correct value', () => {
      expect(targetValueCalculator.targetValueDiffCash).toEqual(10);
    });
  });
});
