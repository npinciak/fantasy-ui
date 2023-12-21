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

export type ClientMlbPlateIqScore = Record<PlateIqScoreProperties, number>;

export type ClientMlbPlateIq = {
  score: ClientMlbPlateIqScore;
  factors: ClientMlbPlateIqFactors;
};

export type ClientMlbPlateIqFactors = {
  positive: ClientMlbPlateIqFactorEntity[] | null;
  negative: ClientMlbPlateIqFactorEntity[] | null;
  positiveCt: number;
  negativeCt: number;
};

export type ClientMlbPlateIqFactorEntity = {
  name: string;
  comparisonValue: number;
  description: string;
  type: string;
};
