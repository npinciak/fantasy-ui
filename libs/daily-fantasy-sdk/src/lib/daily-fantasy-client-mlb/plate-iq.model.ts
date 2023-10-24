type PlateIqScoreProperties =
  | 'contact'
  | 'context'
  | 'pitchTypes'
  | 'Production'
  | 'plateDiscipline'
  | 'recentSkill'
  | 'stolenBase'
  | 'sbFactor'
  | 'overall';

export type PlateIqScore = { [prop in PlateIqScoreProperties]: number };

export type PlateIq = {
  score: PlateIqScore;
  factors: PlateIqFactors;
};

export type PlateIqFactors = {
  positive: PlateIqFactorEntity[] | null;
  negative: PlateIqFactorEntity[] | null;
  positiveCt: number;
  negativeCt: number;
};

export type PlateIqFactorEntity = {
  name: string;
  comparisonValue: number;
  description: string;
  type: string;
};
