export const enum MlbTeamId {
  BOS = 226,
  LAA,
  CWS,
  CLE,
  KC = 231,
  MIL,
  MIN,
  NYY,
  OAK,
  SEA,
  TEX,
  TOR,
  ATL,
  CIN = 241,
  HOU,
  LAD,
  WAS,
  NYM,
  PHI,
  PIT,
  SF = 250,
  ARI = 253,
  ALS = 321,
  NLS,
}

export const MLB_TEAM_ID_MAP: { [key in MlbTeamId]: string } = {
  '226': 'BOS',
  '227': 'LAA',
  '228': 'CWS',
  '229': 'CLE',
  '231': 'KC',
  '232': 'MIL',
  '233': 'MIN',
  '234': 'NYY',
  '235': 'OAK',
  '236': 'SEA',
  '237': 'TEX',
  '238': 'TOR',
  '239': 'ATL',
  '241': 'CIN',
  '242': 'HOU',
  '243': 'LAD',
  '244': 'WAS',
  '245': 'NYM',
  '246': 'PHI',
  '247': 'PIT',
  '250': 'SF',
  '253': 'ARI',
  '321': 'ALS',
  '322': 'NLS',
} as const;
