type SeasonConstantsProperties =
  | 'wOBA'
  | 'wOBAScale'
  | 'wBB'
  | 'wHBP'
  | 'w1B'
  | 'w2B'
  | 'w3B'
  | 'wHR'
  | 'runSB'
  | 'runCS'
  | 'r/PA'
  | 'r/W'
  | 'cFIP';

export type SeasonConst = { [p in SeasonConstantsProperties]: number };
