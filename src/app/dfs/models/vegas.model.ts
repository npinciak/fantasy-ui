type VegasAttributes = 'overUnder' | 'oppTotal' | 'total' | 'line' | 'movement';

export type Vegas = { [att in VegasAttributes]: number | null };
