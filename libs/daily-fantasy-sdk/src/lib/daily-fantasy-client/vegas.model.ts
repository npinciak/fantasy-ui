type VegasAttributes = 'o/u' | 'opp_total' | 'total' | 'line' | 'movement';

export type Vegas = { [key in VegasAttributes]: number };
