type VegasAttributes = 'o/u' | 'opp_total' | 'total' | 'line' | 'movement';

export type ClientVegas = { [key in VegasAttributes]: number };
