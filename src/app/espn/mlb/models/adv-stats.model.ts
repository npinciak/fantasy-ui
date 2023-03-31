type SeasonStatConstantsProps =
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

export type SeasonStatConst = { [key in SeasonStatConstantsProps]: number };

