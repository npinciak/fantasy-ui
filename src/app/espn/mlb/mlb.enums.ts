/* eslint-disable @typescript-eslint/naming-convention */

enum GameStatus {
  Postponed = 'STATUS_POSTPONED',
}

enum GameStatusById {
  Postponed = 6,
}

enum StatTypeId {
  // season,
  last7Days = 1,
  last15Days,
  last30Days,
  //currentYear = 4,?
  live = 5,
}

enum TeamColumn {
  rank = 'currentRank',
  name = 'teamName',
  totalPoints = 'totalPoints',
  liveScore = 'liveScore',
}

enum PlayingStatus {
  probable = 'PROBABLE',
  notStarting = 'NOTSTARTING',
  active = 'ACTIVE',
}

enum RotoColumn {
  run = 'rotoStats.r',
  homeRun = 'rotoStats.hr',
  rbi = 'rotoStats.rbi',
  sb = 'rotoStats.sb',
  avg = 'rotoStats.avg',
  strikeOut = 'rotoStats.k',
  win = 'rotoStats.w',
  save = 'rotoStats.sv',
  era = 'rotoStats.era',
  whip = 'rotoStats.whip',
  pitchingLimit = 'pitchingLimit',
  battingTotal = 'totalBattingRoto',
  pitchingTotal = 'totalPitchingRoto',
}

enum StatsColumn {
  hits = 'stats.h',
  run = 'stats.r',
  homeRun = 'stats.hr',
  rbi = 'stats.rbi',
  sb = 'stats.sb',
  avg = 'stats.avg',
  strikeOut = 'stats.k',
  win = 'stats.w',
  save = 'stats.sv',
  era = 'stats.era',
  whip = 'stats.whip',
}

enum MLBPosition {
  POS0,
  SP,
  C,
  '1B',
  '2B',
  '3B',
  SS,
  LF,
  CF,
  RF,
  DH,
  RP,
  PH,
  PR,
}

enum MLBLineup {
  C,
  '1B',
  '2B',
  '3B',
  SS,
  OF,
  '2B/SS',
  '1B/3B',
  LF,
  CF,
  RF,
  DH,
  UTIL,
  P,
  SP,
  RP,
  BE,
  IL,
  INV,
  IF,
  B,
  P2,
  MISC,
}

enum MLBTeam {
  FA,
  Bal,
  Bos,
  LAA,
  ChW,
  Cle,
  Det,
  KC,
  Mil,
  Min,
  NYY,
  Oak,
  Sea,
  Tex,
  Tor,
  Atl,
  ChC,
  Cin,
  Hou,
  LAD,
  Wsh,
  NYM,
  Phi,
  Pit,
  StL,
  SD,
  SF,
  Col,
  Mia,
  Ari,
  TB,
}

export { MLBTeam, MLBPosition, MLBLineup, StatsColumn, RotoColumn, TeamColumn, StatTypeId, PlayingStatus };
