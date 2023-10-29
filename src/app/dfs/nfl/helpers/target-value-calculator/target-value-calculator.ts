import { TargetValueCalculatorConstructor, TargetValueSiteConfiguration } from './target-value-calculator.model';

export class TargetValueCalculator {
  private position: string;
  private dfsSite: string;
  private salary: number;
  private fantasyPoints: number;
  private configuration: Record<string, Record<string, TargetValueSiteConfiguration>>;

  constructor({ salary, fantasyPoints, position, dfsSite, configuration }: TargetValueCalculatorConstructor) {
    this.salary = salary;
    this.position = position;
    this.dfsSite = dfsSite;
    this.fantasyPoints = fantasyPoints;
    this.configuration = configuration;
  }

  get valueTargetGPPs(): number | null {
    return this.calculateTargetValue(this.targetValueConfigByPosition.valueTargetMultiplierGPPs);
  }

  get valueTargetCash(): number | null {
    return this.calculateTargetValue(this.targetValueConfigByPosition.valueTargetMultiplierCash);
  }

  get targetValueDiffGPPs(): number | null {
    return this.calculateTargetValueDiff(this.valueTargetGPPs);
  }

  get targetValueDiffCash(): number | null {
    return this.calculateTargetValueDiff(this.valueTargetCash);
  }

  private calculateTargetValue(multiplier: number | null): number | null {
    if (!multiplier) return null;
    return (this.salary * multiplier) / 1000;
  }

  private calculateTargetValueDiff(targetValue: number | null): number | null {
    if (!targetValue) return null;
    return targetValue - this.fantasyPoints;
  }

  private get targetValueConfigByPosition(): TargetValueSiteConfiguration {
    if (!this.configuration[this.position]) return this.configuration['UNKNOWN'][this.dfsSite];
    return this.configuration[this.position][this.dfsSite];
  }
}
