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
  | 'R/PA'
  | 'R/W'
  | 'cFIP';

export type SeasonConst = { [key in SeasonConstantsProperties]: number };
