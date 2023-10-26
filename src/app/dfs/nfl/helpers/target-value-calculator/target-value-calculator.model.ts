export type TargetValueCalculatorConstructor = {
  position: string;
  dfsSite: string;
  salary: number;
  fantasyPoints: number;
  configuration: Record<string, Record<string, TargetValueSiteConfiguration>>;
};

export type TargetValueSiteConfiguration = {
  minimumSalary: number;
  valueTargetMultiplierCash: number;
  valueTargetMultiplierGPPs: number;
  minimumFantasyPointsCash: number;
  minimumFantasyPointsGPPs: number;
};
