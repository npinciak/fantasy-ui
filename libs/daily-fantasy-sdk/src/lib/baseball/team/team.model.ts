export const enum MlbTeamId {
  BAL = 225,
  BOS,
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
  CHC,
  CIN,
  HOU,
  LAD,
  WAS,
  NYM,
  PHI,
  PIT,
  STL,
  SD,
  SF,
  COL = 251,
  ARI = 253,
  TB = 254,
  ALS = 321,
  NLS,
}

export const MLB_TEAM_ID_MAP: { [key in MlbTeamId]: string } = {
  '225': 'BAL',
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
  '240': 'CHC',
  '241': 'CIN',
  '242': 'HOU',
  '243': 'LAD',
  '244': 'WAS',
  '245': 'NYM',
  '246': 'PHI',
  '247': 'PIT',
  '248': 'STL',
  '249': 'SD',
  '250': 'SF',
  '251': 'COL',
  '253': 'ARI',
  '254': 'TB',
  '321': 'ALS',
  '322': 'NLS',
} as const;
