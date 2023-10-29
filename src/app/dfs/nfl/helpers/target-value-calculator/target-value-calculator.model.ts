export type TargetValueCalculatorConstructor = {
  position: string;
  dfsSite: string;
  salary: number;
  fantasyPoints: number;
  configuration: Record<string, Record<string, TargetValueSiteConfiguration>>;
};

export type TargetValueSiteConfiguration = {
  minimumSalary: number | null;
  valueTargetMultiplierCash: number | null;
  valueTargetMultiplierGPPs: number | null;
  minimumFantasyPointsCash: number | null;
  minimumFantasyPointsGPPs: number | null;
};
